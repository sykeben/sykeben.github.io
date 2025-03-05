//==============================================================================
// CONFIGURATION
//==============================================================================

// Define configuration.
const config = {
    timeFormat: { hour: "2-digit", minute: "2-digit", second: "2-digit" },
    dateFormat: { weekday: "long", year: "numeric", month: "long", day: "numeric" },
    noaaStation: "KLAF"
};

//==============================================================================
// UPDATE HELPERS
//==============================================================================

// JSON helper.
function getJSON(url) {
    return new Promise((resolve) => {
        fetch(url)
            .then(response => response.json())
            .then(data => resolve({ success: true, data }))
            .catch(error => resolve({ success: false, data: error }));
    });
}

// Update manager helper.
function startUpdateManager(widgets) {
    widgets.forEach((widget) => {
        widget.startInterval();
    });
}


// Simple text update helpder.
function updateText(id, subid, content) {
    const fullid = subid ? `${id}-${subid}` : id;
    document.getElementById(fullid).textContent = content;
}

//==============================================================================
// CONVERSION HELPERS
//==============================================================================

// C to F helper.
function degCtoF(degC) {
    return (degC * 9.0 / 5.0) + 32.0;
}

// Km(/H) to Mi(/H) helper.
function KtoMi(km) {
    return km * 0.6213712;
}

// Angle to Direction helper.
function nwseAngle(angle) {
    const cardinals = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index = Math.round(((angle %= 360) < 0 ? angle + 360 : angle) / 45) % 8;
    return cardinals[index];
}

//==============================================================================
// MOMENT WIDGET
//==============================================================================

// Moment: Time.
const updateMomentTime = (id, lastData = null) => new Promise((resolve) => {

    // Get data.
    var newData = null;
    if (lastData) {
        newData = lastData;
    } else {
        newData = new Date().toLocaleTimeString(undefined, config.timeFormat);
    }

    // Update.
    updateText(id, null, newData);
    resolve(newData);

});

// Moment: Date.
const updateMomentDate = (id, lastData = null) => new Promise((resolve) => {

    // Get data.
    var newData = null;
    if (lastData) {
        newData = lastData;
    } else {
        newData = new Date().toLocaleDateString(undefined, config.dateFormat);
    }

    // Update.
    updateText(id, null, newData);
    resolve(newData);

});

//==============================================================================
// CAMPUS WEATHER WIDGET
//==============================================================================

// Campus weather.
const updateCampusWeather = (id, lastData = null) => new Promise((resolve) => {

    // Promise data.
    promiseData = lastData ? new Promise((resolve) => {

        // Re-use existing data.
        resolve(lastData);

    }) : new Promise((resolve) => {

        // Get new data.
        getJSON(`https://api.weather.gov/stations/${config.noaaStation}/observations/latest`).then((result) => {
            if (result.success) {
                const data = result.data.properties;
                resolve({
                    temp: {
                        real: degCtoF(data.temperature.value),
                        feels: degCtoF(data.dewpoint.value)
                    },
                    text: data.textDescription,
                    humid: data.relativeHumidity.value,
                    wind: {
                        speed: KtoMi(data.windSpeed.value),
                        direction: nwseAngle(data.windDirection.value)
                    }
                });
            } else {
                resolve(null);
            }
        });

    });

    // Update.
    promiseData.then((newData) => {
        if (newData) {
            console.log(newData);
            updateText(id, "temp-real", Math.round(newData.temp.real));
            updateText(id, "text", newData.text);
            updateText(id, "temp-feels", Math.round(newData.temp.feels));
            updateText(id, "wind-speed", Math.round(newData.wind.speed));
            updateText(id, "wind-direction", newData.wind.direction);
            updateText(id, "humid", Math.round(newData.humid));
        }
        resolve(newData);
    });

});

//==============================================================================
// WIDGET CLASS
//==============================================================================

// Widget class.
class Widget {

    // Constructor.
    constructor(id, update = null, period = 0, useCache = true) {
        this.id = id; // Identifier.
        this.update = update; // Update handler.
        this.period = period; // Time period.
        this.useCache = useCache; // Cache setting.
        this.interval = null; // Interval id.

        // Initialize cache info.
        this.lastUpdated = 0;
        this.lastData = null;

        // Load last update time and data from localStorage, if needed.
        if (useCache) {
            const cached = localStorage.getItem(`initwidget-${this.id}`);
            if (cached) {
                const parsed = JSON.parse(cached);
                this.lastUpdated = parsed.updated || 0;
                this.lastData = parsed.data || null;
            }
        }
    }

    // Safe update handler.
    safeUpdate() {
        const now = Date.now();
        if (!this.lastUpdated || now - this.lastUpdated >= this.period) {

            // Time for a new update.
            this.update(this.id, null).then((newData) => {

                // Advance if it worked.
                if (newData) {
                    this.lastUpdated = now;
                    this.lastData = newData;
                    if (this.useCache) {
                        localStorage.setItem(`initwidget-${this.id}`, JSON.stringify({
                            updated: this.lastUpdated,
                            data: this.lastData
                        }));
                    }
                }

            });

        } else {

            // Too early! Just update from existing data.
            this.update(this.id, this.lastData);

        }
    }

    // Interval starter.
    startInterval() {
        if (this.update && this.period) {
            this.safeUpdate();
            this.interval = setInterval(() => this.safeUpdate(), this.period);
        }
    }

    // Interval stopper.
    stopInterval() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }

}

//==============================================================================
// UPDATE MANAGER
//==============================================================================

// Start update manager.
startUpdateManager([
    new Widget("moment-time", updateMomentTime, 1000, false),
    new Widget("moment-date", updateMomentDate, 60000, false),
    new Widget("weather", updateCampusWeather, 900000, true)
]);

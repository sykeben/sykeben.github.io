//==============================================================================
// CONFIGURATION
//==============================================================================

// Define configuration.
const config = {
    timeFormat: { hour: "2-digit", minute: "2-digit", second: "2-digit" },
    dateFormat: { weekday: "long", year: "numeric", month: "long", day: "numeric" },
    noaaStation: "KLAF",
    nasaKey: "DEMO_KEY" // Nice try, webscrapers!
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

// XML helper.
function getXML(url) {
    return new Promise((resolve) => {
        fetch(url)
            .then(response => response.text())
            .then(str => (new window.DOMParser()).parseFromString(str, "application/xml"))
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

// Element from idset helper.
function idElement(id, subid) {
    return document.getElementById(subid ? `${id}-${subid}` : id);
}

// Simple text update helper.
function updateText(id, subid, content) {
    idElement(id, subid).textContent = content;
}

// Simple image update helper.
function updateImage(id, subid, source, doLayout = false) {
    const elem = idElement(id, subid);
    if (doLayout) {
        elem.addEventListener("load", () => {
            setTimeout(() => { masonry.layout(); }, 125);
        }, { once: true });
    }
    elem.src = source;
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
// MOMENT TIME/DATE
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
// CAMPUS WEATHER
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
                    station: config.noaaStation,
                    icon: data.icon,
                    temp: {
                        real: degCtoF(data.temperature.value),
                        feels: degCtoF(data.windChill.value)
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
            updateText(id, "station", newData.station);
            updateImage(id, "icon", newData.icon);
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
// ELECTRICAL ENGINEERING QUOTE
//==============================================================================

// EE Quote.
const updateEEQuote = (id, lastData = null) => new Promise((resolve) => {

    // Load quotes.
    const quotes = [
        { quote: "The best way to predict the future is to invent it.", author: "Alan Kay" },
        { quote: "If you can't explain it simply, you don't understand it well enough.", author: "Albert Einstein" },
        { quote: "The greatest value of a picture is when it forces us to notice what we never expected to see.", author: "John Tukey" },
        { quote: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.", author: "Aristotle" },
        { quote: "The purpose of computing is insight, not numbers.", author: "Richard Hamming" },
        { quote: "Science is what we understand well enough to explain to a computer. Art is everything else we do.", author: "Donald Knuth" },
        { quote: "Innovation is the outcome of a habit, not a random act.", author: "Herbert Simon" },
        { quote: "An engineer is someone who can do for a dime what any fool can do for a dollar.", author: "Theodore Roosevelt" },
        { quote: "The main thing in technology is to understand how to use the tools, not just make them.", author: "Bob Metcalfe (Purdue Alumni)" },
        { quote: "Electrons can move and work wonders.", author: "Nikola Tesla" },
        { quote: "The most important part of a process is not the apparatus, it's the ideas it represents.", author: "Vannevar Bush" },
        { quote: "The principle of a well-made electric machine is that all parts work as a unit.", author: "Thomas Edison" },
        { quote: "What is known to be true is only true as long as it is understood.", author: "George Washington Carver" },
        { quote: "Every day I am learning something new, because everything I've learned up to now will soon be obsolete.", author: "Bill Gates (Purdue Alumni)" },
        { quote: "To invent is to rebel against the ordinary.", author: "James Clerk Maxwell" },
        { quote: "The real problem is not whether machines think but whether men do.", author: "B.F. Skinner" },
        { quote: "The most incomprehensible thing about the world is that it is comprehensible.", author: "Albert Einstein" },
        { quote: "A good engineer is someone who makes things work efficiently and effectively.", author: "Robert Noyce" },
        { quote: "Mathematics is the most beautiful and most powerful creation of the human spirit.", author: "Stefan Banach" },
        { quote: "Any sufficiently advanced technology is indistinguishable from magic.", author: "Arthur C. Clarke" },
        { quote: "You can't teach creativity, but you can teach the tools to unlock it.", author: "Dean Kamen" },
        { quote: "Invention is the mother of necessity.", author: "Marshall McLuhan" },
        { quote: "The future belongs to those who can see possibilities before they become obvious.", author: "John Sculley" },
        { quote: "It is not the strongest of the species that survive, nor the most intelligent, but the one most responsive to change.", author: "Charles Darwin" },
        { quote: "There are no shortcuts to any place worth going.", author: "Beverly Sills" },
        { quote: "I am not a product of my circumstances. I am a product of my decisions.", author: "Stephen R. Covey" },
        { quote: "You can't solve problems with the same kind of thinking that created them.", author: "Albert Einstein" },
        { quote: "If you want to go fast, go alone. If you want to go far, go together.", author: "African Proverb" },
        { quote: "A machine can do the work of 50 ordinary men, but no machine can do the work of one extraordinary man.", author: "Elbert Hubbard" },
        { quote: "Imagination is more important than knowledge.", author: "Albert Einstein" },
        { quote: "The power of imagination makes us infinite.", author: "John Muir" },
        { quote: "Engineers like to solve problems. If there are no problems handily available, they will create their own problems.", author: "Scott Adams" },
        { quote: "Everything that can be invented has been invented.", author: "Charles H. Duell (incorrectly attributed, but notable)" },
        { quote: "Great ideas often receive violent opposition from mediocre minds.", author: "Albert Einstein" },
        { quote: "Nothing in life is to be feared, it is only to be understood.", author: "Marie Curie" },
        { quote: "The science of today is the technology of tomorrow.", author: "Edward Teller" },
        { quote: "It is easier to build strong children than to repair broken men.", author: "Frederick Douglass" },
        { quote: "The people who are crazy enough to think they can change the world are the ones who do.", author: "Rob Siltanen" },
        { quote: "The computer was born to solve problems that did not exist before.", author: "Bill Gates" },
        { quote: "We cannot solve our problems with the same thinking we used when we created them.", author: "Albert Einstein" },
        { quote: "It's not about ideas. It's about making ideas happen.", author: "Scott Belsky" },
        { quote: "Genius is one percent inspiration and ninety-nine percent perspiration.", author: "Thomas Edison" },
        { quote: "If you want to change the world, pick up your pen and write.", author: "Martin Luther" },
        { quote: "Power is not the key to everything. It is the key to everything that exists.", author: "Nikola Tesla" },
        { quote: "There is no substitute for hard work.", author: "Thomas Edison" },
        { quote: "Machines are not just tools, they are a reflection of the human mind.", author: "Alan Turing" },
        { quote: "It's not the size of the dog in the fight, it's the size of the fight in the dog.", author: "Mark Twain" },
        { quote: "I find that the harder I work, the more luck I seem to have.", author: "Thomas Jefferson" },
        { quote: "Our inventions are like children that we create and release into the world.", author: "Nikola Tesla" },
        { quote: "Imagination is the eye of the soul.", author: "Joseph Joubert" },
        { quote: "The true sign of intelligence is not knowledge but imagination.", author: "Albert Einstein" },
        { quote: "The first rule of intelligent tinkering is to save all the parts.", author: "Paul Ehrlich" },
        { quote: "You don't have to be great to start, but you have to start to be great.", author: "Zig Ziglar" },
        { quote: "Science and technology revolutionize our lives, but memory, tradition, and myth frame our responses.", author: "Arthur M. Schlesinger, Jr." }
    ];

    // Get data.
    var newData = null;
    if (lastData) {
        newData = lastData;
    } else {
        newData = quotes[Math.floor(Math.random() * quotes.length)];
    }

    // Update.
    if (newData) {
        updateText(id, "quote", newData.quote);
        updateText(id, "author", newData.author);
        masonry.layout();
    }
    resolve(newData);

});

//==============================================================================
// NASA APOD
//==============================================================================

// NASA APoD.
const updateNasaAPOD = (id, lastData = null) => new Promise((resolve) => {

    // Promise data.
    promiseData = lastData ? new Promise((resolve) => {

        // Re-use existing data.
        resolve(lastData);

    }) : new Promise((resolve) => {

        // Get new data.
        getJSON(`https://api.nasa.gov/planetary/apod?api_key=${config.nasaKey}`).then((result) => {
            if (result.success) {
                const data = result.data;
                resolve({
                    title: data.title,
                    desc: data.explanation,
                    img: { sd: data.url, hd: data.hdurl }
                });
            } else {
                resolve(null);
            }
        });

    });

    // Update.
    promiseData.then((newData) => {
        if (newData) {
            updateText(id, "title", newData.title);
            updateText(id, "modal-title", newData.title);
            updateText(id, "modal-desc", newData.desc);
            updateImage(id, "img", newData.img.sd, true);
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
        this.id = id;
        this.update = update;
        this.period = period;
        this.useCache = useCache;
        this.interval = null;

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
                            updated: this.lastUpdated, data: this.lastData
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
    new Widget("weather", updateCampusWeather, 900000, true),
    new Widget("eequote", updateEEQuote, 3600000, true),
    new Widget("nasaapod", updateNasaAPOD, 21600000, true),
]);

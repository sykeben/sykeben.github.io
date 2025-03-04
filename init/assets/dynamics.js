// Widget class.
class Widget {

    // Constructor.
    constructor(id, update = null, period = 0) {
        this.id = id; // Identifier.
        this.update = update; // Update handler.
        this.period = period; // Time period.
        this.lastUpdated = 0; // Last update time.
        this.interval = null; // Interval id.
    }

    // Safe update handler.
    safeUpdate() {
        const now = Date.now();
        if (!this.lastUpdated || now - this.lastUpdated >= this.period) {
            this.lastUpdated = now;
            this.update(this.id);
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

// Moment update handlers.
function updateMomentTime(id) {
    document.getElementById(id).textContent = new Date().toLocaleTimeString(undefined, {
        hour: "2-digit", minute: "2-digit", second: "2-digit"
    });
}
function updateMomentDate(id) {
    document.getElementById(id).textContent = new Date().toLocaleDateString(undefined, {
        weekday: "long", year: "numeric", month:"long", day: "numeric"
    });
}

// Update manager.
document.addEventListener("DOMContentLoaded", () => {

    // Define widgets.
    const widgets = [
        new Widget("moment-time", updateMomentTime, 1000),
        new Widget("moment-date", updateMomentDate, 60000)
    ];

    // Initialize.
    widgets.forEach((widget) => {
        widget.startInterval();
    });

});

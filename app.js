// Speedometer App
class GPSSpeedometer {
    constructor() {
        this.isTracking = false;
        this.watchId = null;
        this.maxSpeed = 0;
        this.lastPosition = null;
        this.lastTime = null;
        
        this.elements = {
            status: document.getElementById('status'),
            accuracy: document.getElementById('accuracy'),
            speedValue: document.getElementById('speedValue'),
            latitude: document.getElementById('latitude'),
            longitude: document.getElementById('longitude'),
            altitude: document.getElementById('altitude'),
            maxSpeed: document.getElementById('maxSpeed'),
            needle: document.getElementById('needle'),
            startBtn: document.getElementById('startBtn'),
            resetBtn: document.getElementById('resetBtn'),
        };

        this.setupEventListeners();
    }

    setupEventListeners() {
        this.elements.startBtn.addEventListener('click', () => this.toggleTracking());
        this.elements.resetBtn.addEventListener('click', () => this.reset());
    }

    toggleTracking() {
        if (!this.isTracking) {
            this.startTracking();
        } else {
            this.stopTracking();
        }
    }

    startTracking() {
        if (!navigator.geolocation) {
            this.setStatus('Geolocation not supported', 'error');
            return;
        }

        this.setStatus('Requesting location...', '');
        this.elements.startBtn.disabled = true;

        const options = {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        };

        this.watchId = navigator.geolocation.watchPosition(
            (position) => this.onPositionUpdate(position),
            (error) => this.onPositionError(error),
            options
        );

        this.isTracking = true;
        this.elements.startBtn.textContent = 'Stop GPS';
        this.elements.startBtn.disabled = false;
    }

    stopTracking() {
        if (this.watchId !== null) {
            navigator.geolocation.clearWatch(this.watchId);
            this.watchId = null;
        }

        this.isTracking = false;
        this.elements.startBtn.textContent = 'Start GPS';
        this.setStatus('GPS Stopped', '');
        this.updateSpeed(0);
    }

    onPositionUpdate(position) {
        const { latitude, longitude, accuracy, altitude } = position.coords;
        
        this.setStatus('GPS Active', 'active');
        this.elements.accuracy.textContent = `Accuracy: ±${Math.round(accuracy)}m`;
        
        this.elements.latitude.textContent = latitude.toFixed(6);
        this.elements.longitude.textContent = longitude.toFixed(6);
        this.elements.altitude.textContent = altitude ? `${Math.round(altitude)}m` : 'N/A';

        if (this.lastPosition && this.lastTime) {
            const speed = this.calculateSpeed(
                this.lastPosition,
                position.coords,
                this.lastTime,
                position.timestamp
            );

            if (speed >= 0) {
                this.updateSpeed(speed);
                
                if (speed > this.maxSpeed) {
                    this.maxSpeed = speed;
                    this.elements.maxSpeed.textContent = Math.round(this.maxSpeed) + ' km/h';
                }
            }
        }

        this.lastPosition = position.coords;
        this.lastTime = position.timestamp;
    }

    onPositionError(error) {
        let errorMessage = 'Unknown error';
        
        switch (error.code) {
            case error.PERMISSION_DENIED:
                errorMessage = 'Location permission denied';
                break;
            case error.POSITION_UNAVAILABLE:
                errorMessage = 'Location unavailable';
                break;
            case error.TIMEOUT:
                errorMessage = 'Location request timeout';
                break;
        }

        this.setStatus(errorMessage, 'error');
        this.isTracking = false;
        this.elements.startBtn.textContent = 'Start GPS';
        this.elements.startBtn.disabled = false;
    }

    calculateSpeed(pos1, pos2, time1, time2) {
        // Calculate distance using Haversine formula
        const R = 6371; // Earth's radius in km
        const dLat = this.toRad(pos2.latitude - pos1.latitude);
        const dLon = this.toRad(pos2.longitude - pos1.longitude);
        
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.cos(this.toRad(pos1.latitude)) * Math.cos(this.toRad(pos2.latitude)) *
                  Math.sin(dLon / 2) * Math.sin(dLon / 2);
        
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; // Distance in km

        // Calculate time difference in hours
        const timeDiff = (time2 - time1) / (1000 * 3600); // Convert ms to hours

        if (timeDiff > 0) {
            const speed = distance / timeDiff;
            
            // Filter out unrealistic speeds (> 300 km/h)
            if (speed < 300) {
                return speed;
            }
        }

        return -1; // Invalid calculation
    }

    toRad(degrees) {
        return degrees * (Math.PI / 180);
    }

    updateSpeed(speed) {
        const roundedSpeed = Math.round(speed);
        this.elements.speedValue.textContent = roundedSpeed;

        // Update needle rotation (0-180 degrees for 0-160 km/h)
        const maxKmh = 160;
        const angle = (Math.min(roundedSpeed, maxKmh) / maxKmh) * 180;
        this.elements.needle.style.transform = `rotate(${angle}deg)`;
        this.elements.needle.style.transformOrigin = '100px 100px';
    }

    setStatus(message, className) {
        this.elements.status.textContent = message;
        this.elements.status.className = 'status';
        if (className) {
            this.elements.status.classList.add(className);
        }
    }

    reset() {
        this.maxSpeed = 0;
        this.elements.maxSpeed.textContent = '0 km/h';
        this.updateSpeed(0);
        this.elements.latitude.textContent = '-';
        this.elements.longitude.textContent = '-';
        this.elements.altitude.textContent = '-';
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new GPSSpeedometer();
});

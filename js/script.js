function setThemeClass() {
    document.documentElement.className = Telegram.WebApp.colorScheme;
}

Telegram.WebApp.onEvent('themeChanged', setThemeClass);
setThemeClass();

const DemoApp = {
    initData      : Telegram.WebApp.initData || '',
    initDataUnsafe: Telegram.WebApp.initDataUnsafe || {},
    MainButton    : Telegram.WebApp.MainButton,

    init(options) {
        document.body.style.visibility = '';
        Telegram.WebApp.ready();
        Telegram.WebApp.MainButton.setParams({
            text      : 'CLOSE WEBVIEW',
            is_visible: true
        }).onClick(DemoApp.close);
    },
    expand() {
        Telegram.WebApp.expand();
    },
    close() {
        Telegram.WebApp.close();
    },
    sendMessage() {
        const message = document.getElementById('text_field').textContent.trim();
        Telegram.WebApp.sendData(message);
    },
    sendTime(repeat) {
        const time = new Date().toISOString();
        Telegram.WebApp.sendData(time);
        if (repeat) {
            setTimeout(() => {
                DemoApp.sendTime(true);
            }, 100);
        }
    },
    toggleMainButton(el) {
        if (DemoApp.MainButton.isVisible) {
            DemoApp.MainButton.hide();
            el.textContent = 'Show Main Button';
        } else {
            DemoApp.MainButton.show();
            el.textContent = 'Hide Main Button';
        }
    },
    showAlert(message) {
        Telegram.WebApp.showAlert(message);
    },
    showConfirm(message) {
        Telegram.WebApp.showConfirm(message);
    },
    requestLocation(el) {
        if (Telegram.WebApp.requestLocation) {
            Telegram.WebApp.requestLocation().then(location => {
                el.nextElementSibling.textContent = JSON.stringify(location);
            }).catch(() => {
                el.nextElementSibling.textContent = 'Failed to get location';
            });
        } else {
            el.nextElementSibling.textContent = 'API not supported';
        }
    },
    requestVideo(el) {
        if (Telegram.WebApp.requestVideo) {
            Telegram.WebApp.requestVideo().then(video => {
                el.nextElementSibling.textContent = JSON.stringify(video);
            }).catch(() => {
                el.nextElementSibling.textContent = 'Failed to get video';
            });
        } else {
            el.nextElementSibling.textContent = 'API not supported';
        }
    },
    requestAudio(el) {
        if (Telegram.WebApp.requestAudio) {
            Telegram.WebApp.requestAudio().then(audio => {
                el.nextElementSibling.textContent = JSON.stringify(audio);
            }).catch(() => {
                el.nextElementSibling.textContent = 'Failed to get audio';
            });
        } else {
            el.nextElementSibling.textContent = 'API not supported';
        }
    },
    requestAudioVideo(el) {
        if (Telegram.WebApp.requestAudioVideo) {
            Telegram.WebApp.requestAudioVideo().then(audioVideo => {
                el.nextElementSibling.textContent = JSON.stringify(audioVideo);
            }).catch(() => {
                el.nextElementSibling.textContent = 'Failed to get audio/video';
            });
        } else {
            el.nextElementSibling.textContent = 'API not supported';
        }
    },
    requestWriteAccess() {
        if (Telegram.WebApp.requestWriteAccess) {
            Telegram.WebApp.requestWriteAccess().then(result => {
                alert('Write access granted');
            }).catch(() => {
                alert('Write access denied');
            });
        } else {
            alert('API not supported');
        }
    },
    requestContact() {
        if (Telegram.WebApp.requestContact) {
            Telegram.WebApp.requestContact().then(contact => {
                alert('Contact received: ' + JSON.stringify(contact));
            }).catch(() => {
                alert('Failed to get contact');
            });
        } else {
            alert('API not supported');
        }
    },
    showPopup() {
        Telegram.WebApp.showPopup({
            message: 'Hello!',
            buttons: [
                {
                    type: 'close',
                    id: 'close_button'
                }
            ]
        });
    },
    showScanQrPopup(linksOnly) {
        Telegram.WebApp.showScanQrPopup({
            text: 'Scan QR code',
            linksOnly: linksOnly || false
        }).then(qr => {
            alert('QR data: ' + JSON.stringify(qr));
        }).catch(() => {
            alert('Failed to scan QR code');
        });
    },
    testClipboard(el) {
        if (navigator.clipboard) {
            navigator.clipboard.readText().then(text => {
                el.nextElementSibling.textContent = text;
            }).catch(() => {
                el.nextElementSibling.textContent = 'Failed to read clipboard';
            });
        } else {
            el.nextElementSibling.textContent = 'API not supported';
        }
    }
};

window.addEventListener('DOMContentLoaded', () => {
    DemoApp.init();
});

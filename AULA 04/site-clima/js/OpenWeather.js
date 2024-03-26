class OpenWeather {

    constructor() {
        this.latitude = '-27.068429940268253';
        this.longitude = '-48.88497200672744';
        this.key = '67e94901f7d030d2129aa5afd5053a89';
    }

    async getClima() {

        let chave = this.key;
        let lat = this.latitude;
        let lon = this.longitude;

        let url = 'https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid='+chave+'&units=metric&lang=pt_br';

        let response = await fetch(url);

        let objJson = await response.json();

        console.log(objJson);
        alert('API Retornou');

        return objJson;

    }

}
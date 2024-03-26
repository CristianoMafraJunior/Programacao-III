async function mostrarClima() {
    let o = new OpenWeather();
  
    let objClima = await o.getClima();
  
    exibirClima(objClima);
  }
  
  async function mostrarClimaGeo(posicao) {
    let o = new OpenWeather();
  
    o.latitude = posicao.coords.latitude;
    o.longitude = posicao.coords.longitude;
  
    let objClima = await o.getClima();
  
    exibirClima(objClima);
  }
  
  function exibirClima(objClima) {
    let cidade = document.getElementById("cidade");
    let temperatura = document.getElementById("temperatura");
    let sensacaoTermica = document.getElementById("sensacao");
    let tempMin = document.getElementById("tempMin");
    let tempMax = document.getElementById("tempMax");
    let pressao = document.getElementById("pressao");
    let umidade = document.getElementById("umidade");
    let nivelMar = document.getElementById("nivelMar");
    let nivelSolo = document.getElementById("nivelSolo");
  
    cidade.innerHTML = objClima.name;
    temperatura.innerHTML = objClima.main.temp + "°";
    sensacaoTermica.innerHTML = objClima.main.feels_like + "°";
    tempMin.innerHTML = objClima.main.temp_min + "°";
    tempMax.innerHTML = objClima.main.temp_max + "°";
    pressao.innerHTML = objClima.main.pressure + " hPa";
    umidade.innerHTML = objClima.main.humidity + "%";
    nivelMar.innerHTML = objClima.main.sea_level + " hPa";
    nivelSolo.innerHTML = objClima.main.grnd_level + " hPa";
  }
  
  function exibirClimaDefault() {
    let cidadeDefault = document.getElementById('cidade');
    let temperaturaDefault = document.getElementById('temperatura');
  
    cidadeDefault.innerHTML = "Canelinha";
    temperaturaDefault.innerHTML = "29.90";
  }
  
  function getGeoLocalizacao() {
    navigator.geolocation.getCurrentPosition(mostrarClimaGeo, () => {
      console.log("Erro ao obter geolocalização");
      exibirClimaDefault();
    });
  }
  
  window.onload = () => {
    getGeoLocalizacao();
  };
  
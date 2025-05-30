
    let id = '9505fd1df737e20152fbd78cdb289b6a';
    let city = document.querySelector('.name');
    let form = document.querySelector("form");
    let temperature = document.querySelector('.temperature');
    let description = document.querySelector('.description');
    let valueSearch = document.getElementById('name');
    let clouds = document.getElementById('clouds');
    let humidity = document.getElementById('humidity');
    let pressure = document.getElementById('pressure');
    let main = document.querySelector('main');
    let forecastContainer = document.getElementById('forecast');

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (valueSearch.value != '') {
        searchWeather();
      }
    });

    const searchWeather = () => {
      fetch('https://api.openweathermap.org/data/2.5/weather?q=' + valueSearch.value + '&units=metric&appid=' + id)
        .then(response => response.json())
        .then(data => {
          if (data.cod == 200) {
            city.querySelector('figcaption').innerHTML = data.name;
            city.querySelector('img').src = `https://flagsapi.com/${data.sys.country}/shiny/32.png`;
            temperature.querySelector('img').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
            temperature.querySelector('span').innerText = data.main.temp;
            description.innerText = data.weather[0].description;

            clouds.innerText = data.clouds.all;
            humidity.innerText = data.main.humidity;
            pressure.innerText = data.main.pressure;

            // Fetch forecast using coordinates
            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${data.coord.lat}&lon=${data.coord.lon}&units=metric&appid=${id}`)
              .then(response => response.json())
              .then(forecastData => {
                forecastContainer.innerHTML = '';
                for (let i = 0; i < 8; i++) {
                  const item = forecastData.list[i];
                  const hour = new Date(item.dt_txt).getHours();
                  const icon = item.weather[0].icon;
                  const temp = item.main.temp;

                  const card = document.createElement('div');
                  card.innerHTML = `
                    <p><strong>${hour}:00</strong></p>
                    <img src="https://openweathermap.org/img/wn/${icon}.png" alt="" style="width: 50px;">
                    <p>${Math.round(temp)}°C</p>
                  `;
                  forecastContainer.appendChild(card);
                }
              });
          } else {
            main.classList.add('error');
            setTimeout(() => {
              main.classList.remove('error');
            }, 1000);
          }
          valueSearch.value = '';
        })
    }

    // Default
    const initApp = () => {
      valueSearch.value = 'Washington';
      searchWeather();
    }
    initApp();


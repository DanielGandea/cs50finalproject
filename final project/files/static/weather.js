document.addEventListener('DOMContentLoaded', function () {

    // Here we get the image for the weather route: 

    const default_img = "https://images.unsplash.com/photo-1590055531615-f16d36ffe8ec?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    const rain = "https://images.unsplash.com/photo-1603321544554-f416a9a11fcf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    const thunderstorm = "https://images.unsplash.com/photo-1528485238486-507af7c0aa19?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    const drizzle = "https://images.unsplash.com/photo-1603262439120-3e17d13bab3f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    const snow = "https://images.unsplash.com/photo-1521568901417-dd90e5373f35?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    const clear_sky = "https://images.unsplash.com/photo-1462524500090-89443873e2b4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    const clouds = "https://images.unsplash.com/photo-1483702721041-b23de737a886?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

    // CASE WHEN LOW VISIBILITY
    const atmosphere = "https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"


    // here we select the part where we put the img
    let weather_img = document.querySelector('.task_content > header')

    // gete the weather_id code for knowing which img to display 
    let weather_condition_code = document.getElementById("hidden_code").innerHTML

    // make it a number
    weather_condition_code = Number(weather_condition_code)



    // compare it to the conditions
    // clouds img
    if (weather_condition_code > 800) {
        weather_img.style.background = `linear-gradient(-110deg, rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.5)), url("${clouds}")`;
    }
    // sky img
    else if (weather_condition_code == 800) {
        weather_img.style.background = `linear-gradient(-110deg, rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.5)), url("${clear_sky}")`;
    }
    // low visibility (atmosphere) like mist sand and other miscellaneous
    else if (weather_condition_code < 800 && weather_condition_code > 700) {
        weather_img.style.background = `linear-gradient(-110deg, rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.5)), url("${atmosphere}")`;
    }
    // snow img
    else if (weather_condition_code < 700 && weather_condition_code > 599) {
        weather_img.style.background = `linear-gradient(-110deg, rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.5)), url("${snow}")`;
    }

    // rain img
    else if (weather_condition_code < 600 && weather_condition_code > 499) {
        weather_img.style.background = `linear-gradient(-110deg, rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.5)), url("${rain}")`;
    }

    // drizzle img
    else if (weather_condition_code < 500 && weather_condition_code > 299) {
        weather_img.style.background = `linear-gradient(-110deg, rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.5)), url("${drizzle}")`;
    }

    // thunderstorm img
    else if (weather_condition_code < 300 && weather_condition_code > 199) {
        weather_img.style.background = `linear-gradient(-110deg, rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.5)), url("${thunderstorm}")`;
    }

    // default image
    else {
        weather_img.style.background = `linear-gradient(-110deg, rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.5)), url("${default_img}")`;
    }

})
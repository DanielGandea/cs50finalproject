document.addEventListener('DOMContentLoaded', function () {

    // Code to make input hidden/visible on click : */
    // select the elements to hide
    let task_input = document.querySelectorAll('#task_input, #date_picker, #task_submit');

    // for each, make it invisible, change opacity
    task_input.forEach(function (element) {
        element.style.opacity = '0';
        element.style.marginTop = '-30px';
        element.style.height = '0';
        element.style.width = '0';
        element.style.transition = '0.45s ease-in-out';
    });

    // select the list of tasks and apply transition
    let task_list = document.querySelector('.task_list');
    task_list.style.transition = '0.45s ease-in-out';


    let new_task_btn = document.querySelector('.new_task_btn'); // select & listen for btn (new task)
    let counter = document.querySelector('.counter'); // character count


    new_task_btn.addEventListener("click", function () {

        // if input is already open and user clicks again, close the input
        if (task_input[0].style.opacity == '0') {

            task_input.forEach(function (element) {
                element.style.opacity = '1';
                element.style.marginTop = '0px';
            });

            // style the textarea
            task_input[0].style.height = '150px';
            task_input[0].style.width = 'calc(100% - 25px)';
            task_input[0].style.marginTop = '15px';

            // style for date_picker
            task_input[1].style.height = '35px';
            task_input[1].style.width = '80px';

            // style for add button
            task_input[2].style.height = '35px';
            task_input[2].style.width = '140px';
            task_input[2].style.marginBottom = '25px';

            //make the counter visible
            counter.style.display = 'block';

            // move the taks down a little
            task_list.style.marginTop = '60px';
        }

        else {
            task_input.forEach(function (element) {
                element.style.opacity = '0';
                element.style.marginTop = '-28px';
                element.style.height = '0';
                element.style.width = '0';
            });


            //make the counter visible
            counter.style.display = 'none';

            // move them back up
            task_list.style.marginTop = '0px';
        }
    });


    /*------------- Code for img list to change randomly for dashboard -------------------------------*/
    const images = [
        "https://images.unsplash.com/photo-1592761944705-40d554de7b11?q=80&w=2060&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1509225770129-fbcf8a696c0b?q=80&w=2272&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1513735539099-cf6e5d559d82?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1501082183835-b7b33db89c3f?q=80&w=2320&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1601236414929-677713b2d078?q=80&w=2190&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1583004313509-086a16d5e415?q=80&w=2027&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1499336315816-097655dcfbda?q=80&w=2447&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1590930298432-4567af25e674?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1562359691-94242dfc6543?q=80&w=2103&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1600367933542-c2af4cc62faa?q=80&w=2343&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1603393883033-4a01635ac5fb?q=80&w=2027&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1533282960533-51328aa49826?q=80&w=2142&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1547039996-61c1135690c0?q=80&w=1989&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1589271755419-b813a577ad42?q=80&w=2109&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1612466147934-4a7a64a3abe2?q=80&w=2033&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1625202154537-cd2cb06fc915?q=80&w=2195&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1623417765161-c71d6c83cfee?q=80&w=1944&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ];

    let dashboard_img = document.querySelector('.task_content > header');

    // should use backticks (left-top corner of the keyboard) for plugging that expression                      -- generating random num
    dashboard_img.style.background = `linear-gradient(-110deg, rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.9)), url("${images[Math.floor(Math.random() * 17)]}")`;


    /// ---------- this display the real-time character count -------------------- //
    let textArea = document.querySelector('#task_input');
    textArea.addEventListener("input", function () {
        let counter = textArea.value.length;
        document.getElementById('show').innerHTML = counter;
    })

});
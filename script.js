// Style : Modular Programming

var library = function(){
    let theLibrary = [{title : 'Denial of Death', author : 'Ernst Becker', status : 'Not Read'}, {title : 'Siddhartha', author : 'Hermen Hesse', status: 'Not Read'}, {title : 'Atomic Habits', author : 'James Clear', status : 'Not Read'}]
    // console.log(theLibrary)

    //CacheDom
    let form = document.querySelector('.form')
    let openForm = document.querySelector('.footerimg')
    let submit = document.querySelector('.submit')
    let check = document.querySelector('.fa-check')
    let cross = document.querySelector('.fa-times')
    let books = document.querySelector('.books')

    //BindEvents
    openForm.addEventListener('click', toggleForm)
    submit.addEventListener('click', addBook)
    check.addEventListener('click', e => selectOne(e, 'check'))
    cross.addEventListener('click', e => selectOne(e, 'cross'))

    //Render Library : Reads the library and adds appropriate classes for add, toggle events.
    function renderLibrary (){
        books.textContent = '';

        for (let i = 0; i < theLibrary.length; i++) {
            let div = document.createElement('div')
            div.classList.add('book')

            let title = document.createElement('h3');
            title.classList.add('book-title')
            title.append(`${theLibrary[i].title}`)
            div.appendChild(title);

            let author = document.createElement('h4');
            author.classList.add('book-author')
            author.append(`${theLibrary[i].author}`)
            div.appendChild(author);

            let status = document.createElement('h4');
            status.classList.add('book-status')
            div.append(`${theLibrary[i].status}`)
            div.appendChild(status);

            let edit = document.createElement('i')
            edit.classList.add('fa-asterisk', 'fas')
            div.appendChild(edit)

            let remove = document.createElement('i')
            remove.classList.add('fa-trash', 'fas')
            div.appendChild(remove)

            books.appendChild(div)
        }
    }

    //Render Library, add (Delete function and toggle read status function) to individual books in the Library.
    function reload (){
        renderLibrary();
        addRemovalProperty();
        addToggleProperty();
    }

    //Form for adding new Books
    function toggleForm (){
        form.classList.toggle('form-show');
        openForm.classList.toggle('btn-rotate');
    }

    //Adds Book and Updates Library
    function addBook (){
        let title = document.getElementById('title');
        let author = document.getElementById('author');
        let status = check.style.color;                     
        let read = status == 'green' ? 'Read' : 'Not Read';
        theLibrary.push({title : title.value, author : author.value, status : read});
        toggleForm();
        reload();
    }

    //For setting read or unread property
    function selectOne (event, item){
        event.target.style.color = 'green';
        if (item == 'check') {cross.style.color = 'purple' }
        else {check.style.color = 'purple'}
    }

    //Its a Function bcz it has to be re-implemented after changes to library.
    function addRemovalProperty (){
        let remove = document.querySelectorAll('.fa-trash');
        Array.from(remove).forEach(e => e.addEventListener('click', e => removeBook(e)));
    }

    //Removes Book and updates Library
    function removeBook (event){
        let [title, author, status] = (event.target.parentNode.innerText).split('\n');
        let toRemove = (author == undefined) ?  JSON.stringify({title : '', author: '', status: title}) : 
        JSON.stringify({title:title,author:author,status:status});

        for (let i = 0; i<theLibrary.length; i++) {
            console.log(JSON.stringify(theLibrary[i]))
            if (JSON.stringify(theLibrary[i]) == toRemove){
                theLibrary.splice(i, 1);
                break;
            }
        }
        reload();
    }

    //Toggling Read Status
    function addToggleProperty (){
        let toggle = document.querySelectorAll('.fa-asterisk');
        Array.from(toggle).forEach(e => e.addEventListener('click', e => toggleStatus(e)));
    }

    //Updates Library on Toggle
    function toggleStatus (event){
        let [title, author, status] = (event.target.parentNode.innerText).split('\n');

        for (let i = 0; i<theLibrary.length; i++) {
            if (theLibrary[i].title == title && theLibrary[i].author== author){
                if (theLibrary[i].status == 'Read'){theLibrary[i].status = 'Not Read'}
                else {theLibrary[i].status = 'Read'}
                break;
            }
        }
        reload();
    }

    //Run at Startup
    renderLibrary();
    addRemovalProperty();
    addToggleProperty();
}();






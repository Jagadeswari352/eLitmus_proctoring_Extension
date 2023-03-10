
/* ---------------------- Handling Interval Time Change --------------------- */
document.querySelector('button').addEventListener('click', e => {
    e.preventDefault();
    const val = document.querySelector('input').value;
    fetch(`http://localhost:3000/set_interval?interval=${val}`)
    .then( _ => {
        document.querySelector('.span_int').innerText = 'Interval set!';
        setTimeout(() => document.querySelector('.span_int').innerText = 'Set the interval of the frames (in minutes).', 3000);
    });
});


/* ------- Inserting user details and images in the CSSContainerRule. ------- */
const init = async () => {
    const res = await fetch('http://localhost:3000/get_data');
    const data = JSON.parse(await res.json());

    data.forEach(user => {
        /* ------------------------- Inserting user details ------------------------- */
        const userDiv = document.createElement('div');
        userDiv.classList.add('user');
        userDiv.innerHTML = `
            <div class="user__name">Name - ${user.name}</div>
            <div class="user__email">Email - ${user.email}</div>
            <div class="user__invite">Invite Code - ${user.invite}</div>
        `;
        document.querySelector('.container').appendChild(userDiv);
        
        const wrapper = document.createElement('div');
        wrapper.classList.add('wrapper');
        
        /* ---------------------------- Inserting images ---------------------------- */
        user.images.forEach(image => {
            const card = document.createElement('div');
            card.classList.add('card');
            const img = document.createElement('img');
            const title = document.createElement('span');
            title.classList.add('span');
            title.innerHTML = image.id;
            img.src = image.url;
            card.appendChild(img);
            card.appendChild(title);
            wrapper.appendChild(card);
        });

        /* ------------------------ When there are no images ------------------------ */
        if(user.images.length === 0){
            wrapper.innerHTML = `<p class='warn'> No images uploaded yet! </p>`;
        }
        
        document.querySelector('.container').appendChild(wrapper);

    })
}

init();
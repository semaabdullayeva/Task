fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(data => {
        const dataContainer = document.getElementById('data-container');

        const slicedData = data.slice(0, 9);

        slicedData.forEach(post => {
            const shortBody = post.body.split(' ').slice(0, 10).join(' ') + '...';

            const postHTML = `
                <div class="col-md-4 col-sm-6 my-4">
                    <div class="card">
                        <div class="card-body">
                            <div class="card-main">
                                <h5 class="card-title">${post.title}</h5>
                                <p class="card-text" data-fulltext="${post.body}">${shortBody}</p>
                            </div>
                            <button class="btn read-more mt-3">Read more</button>
                        </div>
                    </div>
                </div>
            `;
            dataContainer.insertAdjacentHTML('beforeend', postHTML);
        });

        document.querySelectorAll('.read-more').forEach(button => {
            button.addEventListener('click', function () {
                const cardText = this.previousElementSibling.querySelector('.card-text');
                const fullText = cardText.getAttribute('data-fulltext');
                const isShortened = cardText.textContent.endsWith('...');

                if (isShortened) {
                    cardText.textContent = fullText;
                    this.textContent = 'Read less';
                } else {
                    cardText.textContent = fullText.split(' ').slice(0, 10).join(' ') + '...';
                    this.textContent = 'Read more';
                }
            });
        });
    })
    .catch(error => console.error('Error:', error));

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('searchButton').addEventListener('click', function() {
        const areaLocation = document.getElementById('areaLocationInput').value.trim();
        fetchTimeForCity(areaLocation);
    });
});

const baseUrl = "https://worldtimeapi.org/api/timezone";

function fetchTimeForCity(areaLocation) {
    const url = `${baseUrl}/${areaLocation}`;
    console.log("Fetching URL:", url); // 显示请求的URL
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("API Response:", data); // 显示API响应
            if (data.datetime) {
                const formattedTime = formatDateTime(data.datetime);
                document.getElementById('timeDisplay').innerText = formattedTime;
            } else {
                throw new Error('No datetime data returned');
            }
        })
        .catch(error => {
            console.error('Error fetching time:', error);
            document.getElementById('timeDisplay').innerText = "Failed to fetch time. Error: " + error.message;
        });
}

function formatDateTime(datetime) {
    const date = new Date(datetime);
    const formattedDate = date.toLocaleDateString('en-US');
    const formattedTime = date.getHours().toString().padStart(2, '0') + ':' + date.getMinutes().toString().padStart(2, '0');
    return `${formattedDate} ${formattedTime}`;
}

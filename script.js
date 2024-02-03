var countdownTimeout;

function startCountdown() {
    var countdownElement = document.getElementById('countdown');
    var rollButton = document.getElementById('rollButton');

    rollButton.disabled = true;

    var seconds = 10;

    function updateCountdown() {
        countdownElement.innerText = 'Rolling in ' + seconds + ' seconds...';
        seconds--;

        if (seconds < 0) {
            rollWinner();
        } else {
            countdownTimeout = setTimeout(updateCountdown, 1000);
        }
    }

    updateCountdown();
}

function rollWinner() {
    var participantsList = document.getElementById('participants');
    var participants = participantsList.getElementsByTagName('li');
    
    if (participants.length === 1) {
        participants[0].style.color = '#4CAF50';
        document.getElementById('winner').innerText = 'The winner is: ' + participants[0].innerText.substr(3);
        enableRollButton();
        return;
    }

    if (participants.length === 0) {
        document.getElementById('winner').innerText = 'Better luck next time!';
        enableRollButton(); 
        return;
    }

    var winnerIndex = Math.floor(Math.random() * participants.length);

    for (var i = 0; i < participants.length; i++) {
        if (i === winnerIndex) {
            participants[i].style.color = '#4CAF50';
            document.getElementById('winner').innerText = 'Better luck next time:  ' + participants[i].innerText.substr(3);
            participantsList.removeChild(participants[i]);

            clearTimeout(countdownTimeout);
            enableRollButton();
        } else {
            participants[i].style.color = 'initial';
        }
    }
}

function enableRollButton() {
    document.getElementById('rollButton').disabled = false;
}

document.getElementById('removeButton').addEventListener('click', function () {
    var participantsList = document.getElementById('participants');
    var participants = participantsList.getElementsByTagName('li');

    if (participants.length > 0) {
        participantsList.removeChild(participants[0]);
        
        clearTimeout(countdownTimeout);
        rollWinner(); 
    }
});

document.getElementById('startButton').addEventListener('click', startCountdown);

document.getElementById('rollButton').addEventListener('click', function() {
    clearTimeout(countdownTimeout);
    startCountdown();
});

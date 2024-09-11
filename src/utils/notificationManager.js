window.showNotification = function(title, message) {
    const modal = document.getElementById('notification-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalMessage = document.getElementById('modal-message');
    const closeBtn = modal.querySelector('.close-modal');

    modalTitle.textContent = title;
    modalMessage.textContent = message;
    modal.style.display = 'block';

    closeBtn.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }

    // 3秒后自动关闭
    setTimeout(() => {
        modal.style.display = 'none';
    }, 3000);
};
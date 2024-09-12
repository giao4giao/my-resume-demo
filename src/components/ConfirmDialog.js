window.ConfirmDialog = {
    show: function(title, message, onConfirm) {
        const currentLang = localStorage.getItem('language') || 'zh';
        const translations = window.translations[currentLang];

        // 移除可能存在的旧对话框
        const oldDialog = document.querySelector('.confirm-dialog');
        if (oldDialog) {
            oldDialog.remove();
        }

        const dialog = document.createElement('div');
        dialog.className = 'confirm-dialog';
        dialog.innerHTML = `
            <div class="confirm-dialog-content">
                <h2>${title}</h2>
                <p>${message}</p>
                <div class="confirm-dialog-buttons">
                    <button class="confirm-yes">${translations.yes}</button>
                    <button class="confirm-no">${translations.no}</button>
                </div>
            </div>
        `;

        const yesButton = dialog.querySelector('.confirm-yes');
        const noButton = dialog.querySelector('.confirm-no');

        yesButton.addEventListener('click', () => {
            onConfirm();
            document.body.removeChild(dialog);
        });

        noButton.addEventListener('click', () => {
            document.body.removeChild(dialog);
        });

        document.body.appendChild(dialog);

        // 添加样式以使对话框居中显示
        dialog.style.position = 'fixed';
        dialog.style.top = '50%';
        dialog.style.left = '50%';
        dialog.style.transform = 'translate(-50%, -50%)';
        dialog.style.zIndex = '1000';
        dialog.style.backgroundColor = 'white';
        dialog.style.padding = '20px';
        dialog.style.boxShadow = '0 0 10px rgba(0,0,0,0.3)';
        dialog.style.borderRadius = '5px';
        dialog.style.textAlign = 'center'; // 使内容居中

        // 设置按钮容器的样式
        const buttonsContainer = dialog.querySelector('.confirm-dialog-buttons');
        buttonsContainer.style.display = 'flex';
        buttonsContainer.style.justifyContent = 'center';
        buttonsContainer.style.marginTop = '20px';

        // 设置按钮样式
        const buttons = dialog.querySelectorAll('.confirm-dialog-buttons button');
        buttons.forEach(button => {
            button.style.margin = '0 10px';
            button.style.padding = '10px 20px';
            button.style.fontSize = '16px';
            button.style.cursor = 'pointer';
            button.style.border = 'none';
            button.style.borderRadius = '5px';
            button.style.backgroundColor = '#3498db';
            button.style.color = 'white';
        });
    }
};
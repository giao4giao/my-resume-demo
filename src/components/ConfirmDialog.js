window.ConfirmDialog = {
    show: function(message, onConfirm, onCancel) {
        const dialogHtml = `
            <div id="confirm-dialog" class="modal">
                <div class="modal-content">
                    <h2>确认操作</h2>
                    <p>${message}</p>
                    <div class="button-group centered">
                        <button id="confirm-yes" class="btn btn-danger">确定</button>
                        <button id="confirm-no" class="btn btn-secondary">取消</button>
                    </div>
                </div>
            </div>
        `;

        // 插入对话框到 DOM
        document.body.insertAdjacentHTML('beforeend', dialogHtml);

        const dialog = document.getElementById('confirm-dialog');
        const confirmYes = document.getElementById('confirm-yes');
        const confirmNo = document.getElementById('confirm-no');

        confirmYes.addEventListener('click', () => {
            onConfirm();
            dialog.remove();
        });

        confirmNo.addEventListener('click', () => {
            if (onCancel) onCancel();
            dialog.remove();
        });

        // 显示对话框
        dialog.style.display = 'block';
    }
};
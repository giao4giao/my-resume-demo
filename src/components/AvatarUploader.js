window.addAvatarUploadListener = function() {
    const addAvatarBtn = document.getElementById('add-avatar-btn');
    addAvatarBtn.addEventListener('click', triggerAvatarUpload);
}

window.triggerAvatarUpload = function() {
    console.log('Triggering avatar upload');
    const avatarInput = document.getElementById('avatar-input');
    if (avatarInput) {
        avatarInput.click(); // 模拟点击隐藏的文件输入框
    } else {
        console.error('Avatar input element not found');
    }
};

window.handleAvatarUpload = function(event) {
    console.log('Handling avatar upload');
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            // 压缩图片并更新头像
            compressImage(e.target.result, function(compressedDataUrl) {
                updateAvatar(compressedDataUrl);
                // 保存当前简历
                if (window.ResumeEditor && typeof window.ResumeEditor.saveCurrentResume === 'function') {
                    window.ResumeEditor.saveCurrentResume();
                } else {
                    console.error('ResumeEditor or saveCurrentResume method not found');
                }
            });
        };
        reader.readAsDataURL(file); // 将文件读取为 Data URL
    }
};

function compressImage(dataUrl, callback) {
    const img = new Image();
    img.onload = function() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // 设置压缩后的最大尺寸
        const maxWidth = 200;
        const maxHeight = 200;
        let width = img.width;
        let height = img.height;

        // 计算缩放比例
        if (width > height) {
            if (width > maxWidth) {
                height *= maxWidth / width;
                width = maxWidth;
            }
        } else {
            if (height > maxHeight) {
                width *= maxHeight / height;
                height = maxHeight;
            }
        }

        canvas.width = width;
        canvas.height = height;

        // 在 canvas 上绘制调整后的图片
        ctx.drawImage(img, 0, 0, width, height);
        
        // 将 canvas 内容转换为压缩后的 JPEG 格式的 Data URL
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
        callback(compressedDataUrl);
    };
    img.src = dataUrl;
}

window.updateAvatar = function(dataUrl) {
    console.log('Updating avatar');
    if (window.ResumeEditor && typeof window.ResumeEditor.getCurrentResumeId === 'function') {
        const currentResumeId = window.ResumeEditor.getCurrentResumeId();
        const currentResumeType = window.ResumeEditor.getCurrentResumeType();
        const resume = window.resumeService.getResumeById(currentResumeId);
        if (resume) {
            // 确保当前简历类型对象存在
            if (!resume[currentResumeType]) {
                resume[currentResumeType] = {};
            }
            // 更新头像数据
            resume[currentResumeType].avatar = dataUrl;
            // 保存更新后的简历
            window.resumeService.saveResume(resume);
            // 更新头像显示
            window.ResumeEditor.updateAvatarDisplay(dataUrl);
            console.log('Avatar updated and saved');
        }
    } else {
        console.error('ResumeEditor or getCurrentResumeId method not found');
    }
};

// // 移除这部分代码，因为它可能在 ResumeEditor 初始化之前执行
// if (window.ResumeEditor && typeof window.ResumeEditor.saveCurrentResume === 'function') {
//     window.ResumeEditor.saveCurrentResume();
// } else {
//     console.error('ResumeEditor or saveCurrentResume method not found');
// }
function ResumeEditor() {
    // 填充简历内容到编辑界面
    function fillResumeContent(resumeData) {
        const resumeContent = document.getElementById('resume-content');
        // 使用模板字符串生成HTML内容
        resumeContent.innerHTML = `
            <!-- 简历头部：姓名、职位和头像 -->
            <div class="resume-header">
                ${resumeData.avatar ? 
                    `<div class="avatar-container">
                        <img src="${resumeData.avatar}" alt="头像" class="avatar">
                    </div>` : ''
                }
                <div class="name-title">
                    <h1 class="editable" id="name">${resumeData.name}</h1>
                    <p class="editable" id="title">${resumeData.title}</p>
                </div>
            </div>
            <!-- 联系方式部分 -->
            <section class="section">
                <h2 class="section-title">联系方式</h2>
                <p class="info-item"><strong>电话：</strong><span class="editable" id="phone">${resumeData.phone}</span></p>
                <p class="info-item"><strong>邮箱：</strong><span class="editable" id="email">${resumeData.email}</span></p>
                <p class="info-item"><strong>地址：</strong><span class="editable" id="address">${resumeData.address}</span></p>
            </section>
            <!-- 教育背景部分 -->
            <section class="section">
                <h2 class="section-title">教育背景</h2>
                <p class="info-item"><strong>学校：</strong><span class="editable" id="school">${resumeData.school}</span></p>
                <p class="info-item"><strong>专业：</strong><span class="editable" id="major">${resumeData.major}</span></p>
                <p class="info-item"><strong>学位：</strong><span class="editable" id="degree">${resumeData.degree}</span></p>
                <p class="info-item"><strong>时间：</strong><span class="editable" id="edu-time">${resumeData['edu-time']}</span></p>
                <p class="info-item"><strong>GPA：</strong><span class="editable" id="gpa">${resumeData.gpa}</span></p>
                <p class="info-item"><strong>相关课程：</strong><span class="editable" id="courses">${resumeData.courses}</span></p>
            </section>
            <!-- 专业技能部分 -->
            <section class="section">
                <h2 class="section-title">专业技能</h2>
                <ul id="skills">
                    ${resumeData.skills.map(skill => `<li class="editable">${skill}</li>`).join('')}
                </ul>
            </section>
            <!-- 实习经历部分 -->
            <section class="section">
                <h2 class="section-title">实习经历</h2>
                <p class="info-item"><strong>公司：</strong><span class="editable" id="company">${resumeData.company}</span></p>
                <p class="info-item"><strong>职位：</strong><span class="editable" id="position">${resumeData.position}</span></p>
                <p class="info-item"><strong>时间：</strong><span class="editable" id="intern-time">${resumeData['intern-time']}</span></p>
                <ul id="intern-responsibilities">
                    ${resumeData['intern-responsibilities'].map(resp => `<li class="editable">${resp}</li>`).join('')}
                </ul>
            </section>
            <!-- 项目经验部分 -->
            <section class="section">
                <h2 class="section-title">项目经验</h2>
                <p class="info-item"><strong>项目名称：</strong><span class="editable" id="project-name">${resumeData['project-name']}</span></p>
                <p class="info-item"><strong>类型：</strong><span class="editable" id="project-type">${resumeData['project-type']}</span></p>
                <p class="info-item"><strong>时间：</strong><span class="editable" id="project-time">${resumeData['project-time']}</span></p>
                <ul id="project-details">
                    ${resumeData['project-details'].map(detail => `<li class="editable">${detail}</li>`).join('')}
                </ul>
            </section>
            <!-- 证书与奖项部分 -->
            <section class="section">
                <h2 class="section-title">证书与奖项</h2>
                <ul id="awards">
                    ${resumeData.awards.map(award => `<li class="editable">${award}</li>`).join('')}
                </ul>
            </section>
            <!-- 个人特质部分 -->
            <section class="section">
                <h2 class="section-title">个人特质</h2>
                <ul id="traits">
                    ${resumeData.traits.map(trait => `<li class="editable">${trait}</li>`).join('')}
                </ul>
            </section>
        `;
        addEditableListeners();
        addAvatarUploadListener();
    }

    // 为可编辑元素添加点击监听器
    function addEditableListeners() {
        const editables = document.querySelectorAll('.editable');
        editables.forEach(el => {
            el.addEventListener('click', function() {
                const text = this.innerText;
                const input = document.createElement('input');
                input.value = text;
                this.innerText = '';
                this.appendChild(input);
                input.focus();
                input.addEventListener('blur', function() {
                    this.parentNode.innerText = this.value;
                });
            });
        });
    }

    // 为头像上传按钮添加监听器
    function addAvatarUploadListener() {
        const addAvatarBtn = document.getElementById('add-avatar-btn');
        addAvatarBtn.addEventListener('click', triggerAvatarUpload);
    }

    // 触发头像上传input的点击事件
    function triggerAvatarUpload() {
        document.getElementById('avatar-input').click();
    }

    // 处理头像上传
    function handleAvatarUpload(event, currentResumeId) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const avatarDataUrl = e.target.result;
                updateAvatar(avatarDataUrl, currentResumeId);
            };
            reader.readAsDataURL(file);
        }
    }

    // 更新头像显示并保存到简历数据中
    function updateAvatar(avatarDataUrl, currentResumeId) {
        const resumeHeader = document.querySelector('.resume-header');
        const avatarContainer = resumeHeader.querySelector('.avatar-container');
        
        if (avatarContainer) {
            avatarContainer.innerHTML = `<img src="${avatarDataUrl}" alt="头像" class="avatar">`;
        } else {
            const newAvatarContainer = document.createElement('div');
            newAvatarContainer.className = 'avatar-container';
            newAvatarContainer.innerHTML = `<img src="${avatarDataUrl}" alt="头像" class="avatar">`;
            resumeHeader.insertBefore(newAvatarContainer, resumeHeader.firstChild);
        }
        
        // 更新简历数据并保存
        const updatedResume = window.resumeService.getResumeById(currentResumeId);
        updatedResume.avatar = avatarDataUrl;
        window.resumeService.saveResume(updatedResume);
    }

    // 保存当前编辑的简历
    function saveCurrentResume(currentResumeId) {
        const updatedResume = { ...window.resumeService.getResumeById(currentResumeId) };
        // 更新所有可编辑字段
        document.querySelectorAll('.editable').forEach(el => {
            if (el.id) {
                updatedResume[el.id] = el.innerText;
            }
        });
        
        // 处理数组类型的字段
        updatedResume.skills = Array.from(document.querySelectorAll('#skills .editable')).map(el => el.innerText);
        updatedResume['intern-responsibilities'] = Array.from(document.querySelectorAll('#intern-responsibilities .editable')).map(el => el.innerText);
        updatedResume['project-details'] = Array.from(document.querySelectorAll('#project-details .editable')).map(el => el.innerText);
        updatedResume.awards = Array.from(document.querySelectorAll('#awards .editable')).map(el => el.innerText);
        updatedResume.traits = Array.from(document.querySelectorAll('#traits .editable')).map(el => el.innerText);

        window.resumeService.saveResume(updatedResume);
        alert('简历已保存');
    }

    // 下载PDF版本的简历
    async function downloadPDF() {
        const resumeContent = document.getElementById('resume-content');
        if (!resumeContent) {
            console.error('Resume content element not found');
            alert('无法找到简历内容，请确保简历已正确加载。');
            return;
        }
        try {
            console.log('Starting PDF download');
            // 临时调整样式以确保所有内容都可见
            const originalStyle = resumeContent.style.cssText;
            resumeContent.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 210mm;
                min-height: 297mm;
                padding: 20mm;
                margin: 0;
                box-sizing: border-box;
                background-color: white;
            `;
            const pdf = await window.generatePDF(resumeContent);
            // 恢复原始样式
            resumeContent.style.cssText = originalStyle;
            console.log('PDF generated, saving...');
            pdf.save('我的简历.pdf');
            console.log('PDF saved');
        } catch (error) {
            console.error('生成PDF时发生错误:', error);
            alert(`生成PDF时发生错误: ${error.message}\n请查看控制台以获取更多信息。`);
        }
    }

    // 返回公共方法
    return {
        fillResumeContent,
        saveCurrentResume,
        downloadPDF,
        triggerAvatarUpload,
        handleAvatarUpload
    };
}

// 将ResumeEditor暴露到全局作用域
window.ResumeEditor = ResumeEditor;
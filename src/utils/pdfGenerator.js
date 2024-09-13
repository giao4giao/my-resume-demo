// 生成PDF文件的函数
async function generatePDF(element) {
    console.log('Starting PDF generation');
    try {
        if (typeof window.jspdf === 'undefined' || typeof html2canvas === 'undefined') {
            throw new Error('Required libraries not loaded');
        }

        // 添加打印样式类
        element.classList.add('print-mode');

        // 创建一个临时容器来复制内容
        const tempContainer = document.createElement('div');
        tempContainer.innerHTML = element.innerHTML;
        tempContainer.classList.add('pdf-container');
        document.body.appendChild(tempContainer);

        // 应用 PDF 生成专用样式
        applyPDFStyles(tempContainer);

        const pdf = new window.jspdf.jsPDF('p', 'pt', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const margins = 40; // 页面边距
        const contentWidth = pdfWidth - 2 * margins; // 内容宽度
        const sections = tempContainer.querySelectorAll('.resume-section');
        let yOffset = margins;

        for (let i = 0; i < sections.length; i++) {
            const section = sections[i];
            const canvas = await html2canvas(section, {
                scale: 3, // 增加缩放比例以提高清晰度
                logging: false,
                useCORS: true,
                allowTaint: true,
                backgroundColor: null // 设置背景为透明
            });
            const imgData = canvas.toDataURL('image/png');
            const imgWidth = contentWidth;
            const imgHeight = canvas.height * contentWidth / canvas.width;

            if (yOffset + imgHeight > pdfHeight - margins) {
                pdf.addPage();
                yOffset = margins;
            }

            const xOffset = (pdfWidth - imgWidth) / 2; // 居中
            pdf.addImage(imgData, 'PNG', xOffset, yOffset, imgWidth, imgHeight, '', 'FAST');
            yOffset += imgHeight + 10; // 减少部分之间的间距

            if (i < sections.length - 1 && yOffset > pdfHeight - margins) {
                pdf.addPage();
                yOffset = margins;
            }
        }

        // 移除打印样式类和临时容器
        element.classList.remove('print-mode');
        document.body.removeChild(tempContainer);

        console.log('PDF generation complete');
        return pdf;
    } catch (error) {
        console.error('Error in PDF generation:', error);
        throw error;
    }
}

function applyPDFStyles(container) {
    // 应用 PDF 专用样式
    container.style.width = '800px';
    container.style.margin = '0 auto';
    container.style.padding = '20px';
    container.style.boxSizing = 'border-box';
    container.style.fontSize = '12px';
    container.style.lineHeight = '1.5';
    container.style.color = '#000';
    container.style.backgroundColor = '#fff';

    // 重置响应式样式
    const elements = container.querySelectorAll('*');
    elements.forEach(el => {
        el.style.width = 'auto';
        el.style.maxWidth = 'none';
        el.style.margin = '0';
        el.style.padding = '0';
        el.style.float = 'none';
        el.style.position = 'static';
    });

    // 恢复列表样式
    const lists = container.querySelectorAll('ul, ol');
    lists.forEach(list => {
        list.style.listStyleType = 'disc'; // 使用实心圆点
        // list.style.paddingLeft = '100px'; // 增加左内边距以对齐内容
        list.style.paddingLeft = '10px'; // 增加左内边距以对齐内容
        list.style.marginTop = '5px';
        list.style.marginBottom = '5px';
    });

    const listItems = container.querySelectorAll('li');
    listItems.forEach(item => {
        item.style.marginBottom = '10px'; // 添加列表项之间的间距
    });

    // 添加对齐样式
    const infoItems = container.querySelectorAll('.info-item');
    infoItems.forEach(item => {
        item.style.display = 'flex';
        item.style.alignItems = 'flex-start';
        item.style.marginBottom = '10px';
    });

    const infoLabels = container.querySelectorAll('.info-item strong');
    infoLabels.forEach(label => {
        label.style.width = '80px'; // 调整标签宽度
        label.style.flexShrink = '0';
        label.style.marginRight = '10px';
        label.style.textAlign = 'right';
    });

    // 应用特定样式
    const header = container.querySelector('.resume-header');
    if (header) {
        header.style.display = 'flex';
        header.style.alignItems = 'center'; // 改回 center
        header.style.marginBottom = '20px';
    }

    const avatar = container.querySelector('.avatar');
    if (avatar) {
        avatar.style.width = '100px';
        avatar.style.height = '100px';
        avatar.style.marginRight = '20px';
        avatar.style.objectFit = 'cover';
    }

    const nameTitle = container.querySelector('.name-title');
    if (nameTitle) {
        nameTitle.style.flex = '1'; // 添加 flex 属性
        nameTitle.style.display = 'flex';
        nameTitle.style.flexDirection = 'column';
        nameTitle.style.justifyContent = 'center';
    }

    const nameTitleH1 = nameTitle.querySelector('h1');
    if (nameTitleH1) {
        nameTitleH1.style.fontSize = '24px'; // 调整字体大小
        nameTitleH1.style.margin = '0 0 5px 0'; // 调整边距
    }

    const nameTitleP = nameTitle.querySelector('p');
    if (nameTitleP) {
        nameTitleP.style.fontSize = '16px'; // 调整字体大小
        nameTitleP.style.margin = '0'; // 调整边距
    }

    // 可以根据需要添加更多特定样式
}

// 将generatePDF函数暴露到全局作用域
window.generatePDF = generatePDF;

// 添加downloadPDF函数
window.downloadPDF = async function() {
    const resumeContent = document.getElementById('resume-content');
    if (!resumeContent) {
        console.error('Resume content element not found');
        alert('无法找到简历内容，请确保简历已正确加载。');
        return;
    }
    try {
        console.log('Starting PDF download');
        
        // 临时移除"添加新项"按钮
        const addItemButtons = resumeContent.querySelectorAll('.add-item-btn');
        addItemButtons.forEach(btn => btn.style.display = 'none');

        const pdf = await generatePDF(resumeContent);
        
        // 恢复"添加新项"按钮
        addItemButtons.forEach(btn => btn.style.display = '');

        console.log('PDF generated, saving...');

        // 获取当前语言
        const currentLang = localStorage.getItem('language') || 'zh';
        const translations = window.translations[currentLang];

        // 设置文件名
        const fileName = currentLang === 'zh' ? '我的简历.pdf' : 'My_Resume.pdf';

        pdf.save(fileName);
        console.log('PDF saved');
    } catch (error) {
        console.error('生成PDF时发生错误:', error);
        alert(`生成PDF时发生错误: ${error.message}\n请查看控制台以获取更多信息。`);
    }
};
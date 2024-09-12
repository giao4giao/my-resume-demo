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
                scale: 2,
                logging: false,
                useCORS: true,
                allowTaint: true
            });
            const imgData = canvas.toDataURL('image/png');
            const imgWidth = contentWidth;
            const imgHeight = canvas.height * contentWidth / canvas.width;

            if (yOffset + imgHeight > pdfHeight - margins) {
                pdf.addPage();
                yOffset = margins;
            }

            const xOffset = (pdfWidth - imgWidth) / 2; // 居中
            pdf.addImage(imgData, 'PNG', xOffset, yOffset, imgWidth, imgHeight);
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

    // 应用特定样式
    const header = container.querySelector('.resume-header');
    if (header) {
        header.style.display = 'flex';
        header.style.alignItems = 'center';
        header.style.marginBottom = '20px';
    }

    const avatar = container.querySelector('.avatar');
    if (avatar) {
        avatar.style.width = '100px';
        avatar.style.height = '100px';
        avatar.style.marginRight = '20px';
    }

    const sections = container.querySelectorAll('.resume-section');
    sections.forEach(section => {
        section.style.marginBottom = '20px';
    });

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
        pdf.save('我的简历.pdf');
        console.log('PDF saved');
    } catch (error) {
        console.error('生成PDF时发生错误:', error);
        alert(`生成PDF时发生错误: ${error.message}\n请查看控制台以获取更多信息。`);
    }
};
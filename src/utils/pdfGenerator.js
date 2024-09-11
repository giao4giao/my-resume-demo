// 生成PDF文件的函数
async function generatePDF(element) {
    console.log('Starting PDF generation');
    try {
        if (typeof window.jspdf === 'undefined' || typeof html2canvas === 'undefined') {
            throw new Error('Required libraries not loaded');
        }

        // 添加打印样式类
        element.classList.add('print-mode');

        const pdf = new window.jspdf.jsPDF('p', 'pt', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const margins = 40; // 页面边距
        const contentWidth = pdfWidth - 2 * margins; // 内容宽度
        const sections = element.querySelectorAll('.resume-section');
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

        // 移除打印样式类
        element.classList.remove('print-mode');

        console.log('PDF generation complete');
        return pdf;
    } catch (error) {
        console.error('Error in PDF generation:', error);
        throw error;
    }
}

// 将generatePDF函数暴露到全局作用域
window.generatePDF = generatePDF;
// 生成PDF文件的函数
async function generatePDF(element) {
    console.log('Starting PDF generation');
    try {
        if (typeof window.jspdf === 'undefined') {
            console.error('jsPDF is undefined');
            throw new Error('jsPDF library not loaded');
        }
        if (typeof html2canvas === 'undefined') {
            console.error('html2canvas is undefined');
            throw new Error('html2canvas library not loaded');
        }

        console.log('Creating canvas');
        // 使用html2canvas将DOM元素转换为canvas
        const canvas = await html2canvas(element, {
            scale: 2,
            logging: true,
            useCORS: true,
            allowTaint: true
        });
        
        console.log('Canvas created, size:', canvas.width, 'x', canvas.height);

        // 将canvas转换为图片数据
        const imgData = canvas.toDataURL('image/png');
        
        console.log('Creating PDF');
        // 创建新的PDF文档，使用A4纸张大小
        const pdf = new window.jspdf.jsPDF('p', 'pt', 'a4');
        
        // 获取PDF页面的宽度和高度
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        
        // 计算缩放比例，确保图片适应PDF页面宽度
        const scale = pdfWidth / canvas.width;
        
        // 计算图片在PDF中的位置
        const imgHeight = canvas.height * scale;
        let heightLeft = imgHeight;
        let position = 0;
        let page = 1;

        // 将图片分页添加到PDF中
        while (heightLeft > 0) {
            pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
            heightLeft -= pdfHeight;
            position -= pdfHeight;
            
            if (heightLeft > 0) {
                pdf.addPage();
                page++;
            }
        }
        
        console.log(`PDF generation complete. Total pages: ${page}`);
        // 返回生成的PDF对象
        return pdf;
    } catch (error) {
        console.error('Error in PDF generation:', error);
        throw error;
    }
}

// 将generatePDF函数暴露到全局作用域
window.generatePDF = generatePDF;
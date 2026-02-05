(function() {
    // 1. Phân tích dữ liệu từ biến DATA_CAU_HOI
    const lines = DATA_CAU_HOI.trim().split('\n');
    const dictionary = {};
    let currentQ = "";

    lines.forEach(line => {
        line = line.trim();
        if (line.startsWith('<')) {
            // Lưu câu hỏi (bỏ phần <NB>, <TH>...)
            currentQ = line.replace(/<.*?>\s*/, "").trim();
        } else if (line.startsWith('*')) {
            // Lưu đáp án đúng cho câu hỏi tương ứng
            const correctAns = line.replace('*', '').substring(2).trim(); // Bỏ "*A. "
            dictionary[currentQ] = correctAns;
        }
    });

    // 2. Hàm thực hiện tự động click (Cần điều chỉnh Selector theo web của bạn)
    // Giả sử mỗi câu hỏi nằm trong div class "question-item"
    const questionsOnPage = document.querySelectorAll('.question-item'); 

    questionsOnPage.forEach(item => {
        const questionText = item.querySelector('.question-title').innerText.trim();
        const correctAnswerText = dictionary[questionText];

        if (correctAnswerText) {
            const options = item.querySelectorAll('.option');
            options.forEach(opt => {
                if (opt.innerText.includes(correctAnswerText)) {
                    opt.click(); // Tự động chọn
                    console.log(`✅ Đã chọn: ${correctAnswerText} cho câu: ${questionText.substring(0, 30)}...`);
                }
            });
        }
    });
})();

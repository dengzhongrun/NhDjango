(function () {
    $(document)
        .ready(function () {
            $('[data-type=captcha]')
                .each(function () {
                    var $captchaImage = $('<img>'),
                        self = $(this),
                        setting = self.data();
                    if (self.find("img").length === 0) {
                        $captchaImage.attr('title', '看不清？换一张');
                        $captchaImage.attr('src', setting.captchaUrl);
                        $captchaImage.click(function () {
                            $captchaImage.attr('src', setting.captchaUrl + '?code=' + Math.random());
                        });
                        self.append($captchaImage);
                    }
                });
        });
}());
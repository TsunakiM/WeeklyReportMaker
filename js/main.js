jQuery(function() {
  // MARK: CONST
  // 項目名。ここを変えればHTMLもメール用の内容も変わります。
  const MAIL_TO = "hogehoge@sample.com";
  const TOPIC01 = "【項目１】";
  const TOPIC02 = "【項目２】";
  const TOPIC03 = "【項目３】";
  const TOPIC04 = "【項目４】";
  // 名前保存用のCookie名
  const COOKIE_NAME = "WeeklyReportName";

  // MARK: variable
  // 年度と第n週の計算
  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth() + 1;
  let weeknum = Math.floor((today.getDate() - today.getDay() + 12) / 7);
  let ymwText = year + "年" + month + "月第" + weeknum + "週";

  // メール生成時に使う変数宣言
  let mailSubject;
  let mailBody;

  // MARK: View
  $(".readOnlyBox").attr("readonly", true);

  // テキストボックスをクリック時、全選択+コピー
  $(".oneClickCopy").on("click", function() {
    $(this).select();
    document.execCommand("copy");
  });

  // 初期設定。項目をHTML化し、Cookieに名前がある場合は予め入れる
  $(document).ready(function() {
    $("#topic01").text(TOPIC01);
    $("#topic02").text(TOPIC02);
    $("#topic03").text(TOPIC03);
    $("#topic04").text(TOPIC04);
    $("#mailTo").val(MAIL_TO);

    if ($.cookie(COOKIE_NAME)) {
      $("#name").val($.cookie(COOKIE_NAME));
    }
  });

  // MARK: functions
  // 本文生成 + メーラー起動
  $("#generateAndSendBtn").on("click", function() {
    generateMailContent();

    mailBody = mailBody.replace(/\n\r?/g, "%0D%0A");
    location.href =
      "mailto:" + MAIL_TO + "?subject=" + mailSubject + "&body=" + mailBody;
  });

  // 本文生成のみ
  $("#generateBtn").on("click", function() {
    generateMailContent();
  });

  function generateMailContent() {
    let name = $("#name").val();
    $.cookie(COOKIE_NAME, name, {
      expires: 32
    });
    mailSubject = "【週間報告書】 " + name + " " + ymwText;
    mailBody =
      "お疲れ様です。 " +
      name +
      "です。\n" +
      ymwText +
      "の週間報告書を送付します。\n\n" +
      TOPIC01 +
      "\n" +
      $('textarea[name="topic01Text"]').val() +
      "\n\n" +
      TOPIC02 +
      "\n" +
      $('textarea[name="topic02Text"]').val() +
      "\n\n" +
      TOPIC03 +
      "\n" +
      $('textarea[name="topic03Text"]').val() +
      "\n\n" +
      TOPIC04 +
      "\n" +
      $('textarea[name="topic04Text"]').val() +
      "\n\n\n以上、よろしくお願いいたします。";

    $('textarea[name="sendTitle"]').val(mailSubject);
    $('textarea[name="sendBody"]').val(mailBody);
  }
});

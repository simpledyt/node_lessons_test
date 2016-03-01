var eventproxy = require('eventproxy');
var superagent = require('superagent');
var cheerio = require('cheerio');
// url ģ���� Node.js ��׼�������
// http://nodejs.org/api/url.html
var url = require('url');

var cnodeUrl = 'https://cnodejs.org/';

superagent.get(cnodeUrl)
  .end(function (err, res) {
    if (err) {
      return console.error(err);
    }
    var topicUrls = [];
    var $ = cheerio.load(res.text);
    // ��ȡ��ҳ���е�����
    $('#topic_list .topic_title').each(function (idx, element) {
      var $element = $(element);
      // $element.attr('href') ������������ /topic/542acd7d5d28233425538b04
      // ������ url.resolve ���Զ��ƶϳ����� url�����
      // https://cnodejs.org/topic/542acd7d5d28233425538b04 ����ʽ
      // �����뿴 http://nodejs.org/api/url.html#url_url_resolve_from_to ��ʾ��
      var href = url.resolve(cnodeUrl, $element.attr('href'));
      topicUrls.push(href);
    });

    console.log(topicUrls);
  });
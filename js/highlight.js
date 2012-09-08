(function() {

var boxStyle = '.highlighter-code-box {\
    background: #F1F1F1;\
    position: fixed;\
    left: 50% ;\
    top: 50% ;\
    border: 1px solid #999;\
    width: 460px;\
    height: 420px;\
    margin: -210px 0 0 -230px;\
    line-height: 25px;\
    border-radius: 3px 3px 0 0;\
}\
.highlighter-code-box-title{\
    height: 25px;\
    background: #444;\
    color: #fff;\
    text-align: center;\
\
    vertical-align: baseline;\
    font-family: Arial,Verdana;\
    font-size: 11px;\
    \
}\
.highlighter-code-box-toolbar{\
    padding: 5px 15px;\
}\
.highlighter-code-input{\
    width: 430px;\
    height: 310px;\
    font-family: "Courier New", Courier, mono;\
    font-size: 12px;\
    border: 1px solid #DFDFDF;\
    margin: 0 auto;\
    display: block;\
    resize: none;\
}\
.highlighter-code-box-bottombar{\
    text-align: right;\
    padding: 5px 15px;\
}\
.highlighter-code-box-bottombar input{\
    border: 1px solid #BBB;\
    margin: 0;\
    padding: 0 0 1px;\
    font-weight: bold;\
    font-size: 11px;\
    width: 94px;\
    height: 24px;\
    color: black;\
    cursor: pointer;\
    border-radius: 3px;\
    background-color: #EEE;\
    background-image: -ms-linear-gradient(bottom, #DDD, white);\
    background-image: -moz-linear-gradient(bottom, #DDD, white);\
    background-image: -o-linear-gradient(bottom, #DDD, white);\
    background-image: -webkit-gradient(linear, left bottom, left top, from(#DDD), to(white));\
    background-image: -webkit-linear-gradient(bottom, #DDD, white);\
    background-image: linear-gradient(bottom, #DDD, white);\
}\
.highlighter-code-box-bottombar input:hover{\
    border: 1px solid #555;\
}';

var boxTemplate = '\
<div class="highlighter-code-box-title">Insert Code</div>\
<div class="highlighter-code-box-toolbar">\
    <label>language: <select id="codeLanguage">\
</select>\
</label>\
</div>\
<textarea id="codeInput" class="highlighter-code-input" ></textarea>\
<div class="highlighter-code-box-bottombar">\
    <input id="codeCancelButton" type="button" value="Cancel">\
    <input id="codeInsertButton" type="button" value="Insert">\
</div>';

var languages = {
    AppleScript:     'applescript',
    AS3:     'as3',
    Bash:    'bash',
    Shell:   'shell',
    ColdFusion:      'cf',
    Cpp:     'cpp',
    C:       'c',
    CSharp:  'csharp',
    Css:     'css',
    Delphi:  'delphi',
    Diff:    'diff',
    Erlang:  'erlang',
    Groovy:  'groovy',
    Html:    'xml',
    Java:    'java',
    JavaFX:  'javafx',
    JavaScript: 'js',
    Perl:    'perl',
    Php:     'php',
    Plain:   'plain',
    Python:  'py',
    Ruby:    'ruby',
    Sass:    'sass',
    Scala:   'scala',
    Sql:     'sql',
    Vb:      'vb',
    Xml:     'xml'
}

var codeBox = {
    create: function() {
        var styleNode = document.createElement('style');
        styleNode.innerHTML = boxStyle;
        document.getElementsByTagName('head')[0].appendChild(styleNode);
        
        this._dom = document.createElement('div');
        this._dom.setAttribute('class' , 'highlighter-code-box');
        this._dom.innerHTML = boxTemplate;
        document.body.appendChild(this._dom);
        this._init = true;
        var that = this;
        var language = this.language = document.getElementById('codeLanguage');
        var textarea = this.textarea = document.getElementById('codeInput');
        var cancel = document.getElementById('codeCancelButton');
        var insert = document.getElementById('codeInsertButton');
        var html = '';
        for(var i in languages){
            html += '<option value="' + languages[i] + '">' + i + '</option>';
        }
        language.innerHTML = html;
        textarea.onkeydown = function(e){
            if(e.keyCode == 9){//tab
                e.preventDefault();
                var start = this.selectionStart, end = this.selectionEnd;
                var text = this.value;
                var tab = '    ';
                text = text.substr(0, start) + tab + text.substr(start);
                this.value = text;
                this.selectionStart = start + tab.length;
                this.selectionEnd = end + tab.length;
            }
        }
        cancel.onclick = function(){
            that.hide();
        }
        insert.onclick = function(){
            var text = textarea.value;
            var lan = language.value;
            var label = language.options[language.selectedIndex].innerHTML;
            text = text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
            text = '<pre class="brush: ' + lan + '; title: ' + label + '">' + text + '</pre>';
            that._action && that._action(text);
            that.hide();
            if(localStorage){
                localStorage['lastLanguage'] = lan;
            }
        }
    },
    show: function(action) {
        if (!this._init) {
            this.create();
        }
        this.textarea.value = '';
        this._action = action;
        if(localStorage && localStorage['lastLanguage']){
            this.language.value = localStorage['lastLanguage'];
        }
        this._dom.style.display = 'block';
    },
    hide: function(){
        this._action = null;
        this._dom.style.display = 'none';
    }
};

tinymce.create('tinymce.plugins.highlight', {
    init : function(ed, url) {
        ed.addButton('highlight', {
            title : 'highlight',
            image : url+'/../images/code-icon.png',
            onclick : function() {
              codeBox.show(function(text){
                ed.selection.setContent(ed.selection.getContent() + text );
              });
            }
        });
    },
    createControl : function(n, cm) {
        return null;
    },
});
tinymce.PluginManager.add('highlight', tinymce.plugins.highlight);

})();
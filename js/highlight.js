(function() {

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
        cancel.onclick = function(){
            that.hide();
        }
        insert.onclick = function(){
            var text = textarea.value;
            var lan = language.value;
            text = text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
            text = '<pre class="brush: ' + lan + '">' + text + '</pre>';
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
codeBox.show();
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
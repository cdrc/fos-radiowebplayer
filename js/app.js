
// This uses require.js to structure javascript:
// http://requirejs.org/docs/api.html#define

define(function(require) {
    // Receipt verification (https://github.com/mozilla/receiptverifier)
    require('receiptverifier');

    // Installation button
    require('./install-button');

    // Install the layouts
    require('layouts/layouts');

    // Write your app here.


    function formatDate(d) {
        return (d.getMonth()+1) + '/' +
            d.getDate() + '/' +
            d.getFullYear();
    }

    // List view

    var list = $('.list').get(0);
    list.add({ title: 'RMC',
               img: '<img src="img/logos/rmc.png">',
               desc: '<audio controls><source src="http://vipicecast.yacast.net:80/rmc_web" type="audio/mpeg"></audio>',
               });
    list.add({ title: 'France Culture',
               img: '<img src="img/logos/fculture.png">',
               desc: '<audio controls><source src="http://mp3.live.tv-radio.com/franceculture/all/franceculturehautdebit.mp3" type="audio/mpeg"></audio>',
               });
    list.add({ title: 'France Info',
               img: '<img src="img/logos/finfo.png">',
               desc: '<source src="http://mp3.live.tv-radio.com/franceinfo/all/franceinfohautdebit.mp3" type="audio/mpeg">',
               });
    list.add({ title: 'France Inter',
               img: '<img src="img/logos/finter.png">',
               desc: '<audio controls><source src="http://mp3.live.tv-radio.com/franceinter/all/franceinterhautdebit.mp3" type="audio/mpeg"></audio>',
               });

    // Detail view

    var detail = $('.detail').get(0);
    detail.render = function(item) {
        $('.title', this).html(item.get('img'));
    //    $('.desc', this).html(item.get('desc'));
     //   $('.date', this).text(formatDate(item.get('date')));
        $('.player', this).html(item.get('desc'));
    };

    // Edit view

    var edit = $('.edit').get(0);
    edit.render = function(item) {
        item = item || { id: '', get: function() { return ''; } };

        $('input[name=id]', this).val(item.id);
        $('input[name=title]', this).val(item.get('title'));
        $('input[name=desc]', this).val(item.get('desc'));
    };

    edit.getTitle = function() {
        var model = this.view.model;

        if(model) {
            return model.get('title');
        }
        else {
            return 'New';
        }
    };

    $('button.add', edit).click(function() {
        var el = $(edit);
        var title = el.find('input[name=title]');
        var desc = el.find('input[name=desc]');
        var model = edit.model;

        if(model) {
            model.set({ title: title.val(), desc: desc.val() });
        }
        else {
            list.add({ title: title.val(),
                       desc: desc.val(),
                       date: new Date() });
        }

        edit.close();
    });
});

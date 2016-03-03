var jsdom = require('jsdom').jsdom;
var WL = require('../../src/framework/wl.js');
var defaults = require('../../src/framework/defaults.js');

describe('ParseMananger', function() {

  var repository = WL.repository;
  var parseManager = WL.parseManager;

  beforeEach(function() {
    repository.clear();
  });


  var document, window, $;

  function setHtml(html) {
    document = global.document =
      jsdom(html);
    window = global.window = document.defaultView;
    $ = document.querySelector;
  }

  it('will fill add stageData to the repository from DOM elements', function() {
    setHtml("<html><head><style id='wl-obj-css'></style></head><body><div data-wl-id='1' data-wl-type='stage'></div><div data-wl-id='2' data-wl-type='stage'><div></body></html>");

    parseManager.parseDocument();

    var stage = repository.get(1, defaults.version);
    expect(stage).toBeDefined();
    expect(stage.attributes.id).toBe('1');
    expect(stage.attributes.type).toBe('stage');
    expect(stage.attributes.children.length).toBe(0);

    stage = repository.get(2, defaults.version);
    expect(stage).toBeDefined();
    expect(stage.attributes.id).toBe('2');
    expect(stage.attributes.type).toBe('stage');
    expect(stage.attributes.children.length).toBe(0);
  });
});

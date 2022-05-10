'use strict';

const { Adw, Gio, Gtk } = imports.gi;

const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();


function init() {
}

function buildPrefsWidget() {
  // Use the same GSettings schema as in `extension.js`
  const settings = ExtensionUtils.getSettings(
      'red.software.systems.easy_docker_containers');
  
  // Create a preferences page and group
  const page = new Adw.PreferencesPage();
  const group = new Adw.PreferencesGroup();
  page.add(group);

  // Create a new preferences row
  const row = new Adw.ActionRow({ title: 'Container count refresh interval. Set to 0 to disable' });
  group.add(row);

  const delayInput = new Gtk.SpinButton({
    valign: Gtk.Align.CENTER,
    climb_rate: 10,
    digits: 0,
    snap_to_ticks: true,
    adjustment: new Gtk.Adjustment({
        lower: 0,
        upper: 3600,
        step_increment: 1,
        page_size: 0,
    }),
  });
  settings.bind(
    'refresh-delay',
    delayInput,
    'value',
    Gio.SettingsBindFlags.DEFAULT
  );

  // Add the switch to the row
  row.add_suffix(delayInput);
  row.activatable_widget = delayInput;

  return page;
}

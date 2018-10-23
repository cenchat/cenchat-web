/**
 * @function
 */
export default function () {
  this.transition(
    this.fromRoute('chats.index'),
    this.toRoute('chats.chat'),
    this.use('toLeft'),
    this.reverse('toRight'),
  );

  this.transition(
    this.fromRoute('profile.index'),
    this.toRoute('profile.edit'),
    this.use('toLeft'),
    this.reverse('toRight'),
  );

  this.transition(
    this.fromRoute('profile.index'),
    this.toRoute('profile.settings'),
    this.use('toLeft'),
    this.reverse('toRight'),
  );

  this.transition(
    this.fromRoute('sites.index'),
    this.toRoute('sites.new'),
    this.use('toLeft'),
    this.reverse('toRight'),
  );

  this.transition(
    this.fromRoute('sites.index'),
    this.toRoute('sites.site'),
    this.use('toLeft'),
    this.reverse('toRight'),
  );

  this.transition(
    this.fromRoute('sites.site.index'),
    this.toRoute('sites.site.roles'),
    this.use('toLeft'),
    this.reverse('toRight'),
  );
}

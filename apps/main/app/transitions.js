/**
 * Liquid Fire transition mapping
 */
export default function() {
  this.transition(
    this.fromRoute('docs.index'),
    this.toRoute('docs.installation'),
    this.use('toLeft'),
    this.reverse('toRight'),
  );

  this.transition(
    this.fromRoute('home.index'),
    this.toRoute('home.sign-in'),
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
    this.fromRoute('sites.index.index'),
    this.toRoute('sites.index.new'),
    this.use('toLeft'),
    this.reverse('toRight'),
  );

  this.transition(
    this.fromRoute('sites.site.page.index'),
    this.toRoute('sites.site.page.merge'),
    this.use('toLeft'),
    this.reverse('toRight'),
  );
}

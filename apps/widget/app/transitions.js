/**
 * @function
 */
export default function () {
  this.transition(
    this.fromRoute('sites.site.pages.page.chats.index'),
    this.toRoute('sites.site.pages.page.chats.chat'),
    this.use('toLeft'),
    this.reverse('toRight'),
  );

  this.transition(
    this.fromRoute('sites.site.pages.page.explore.index'),
    this.toRoute('sites.site.pages.page.explore.chat'),
    this.use('toLeft'),
    this.reverse('toRight'),
  );
}

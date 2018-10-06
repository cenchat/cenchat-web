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
}

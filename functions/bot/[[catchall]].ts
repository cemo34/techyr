export const onRequest: PagesFunction = async (context) => {
  const url = new URL(context.request.url);
  const pathAfterBot = url.pathname.replace(/^\/bot/, '') || '/';
  return Response.redirect(`https://bot.techyr.app${pathAfterBot}${url.search}`, 301);
};

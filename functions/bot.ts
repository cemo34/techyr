export const onRequest: PagesFunction = async (context) => {
  const url = new URL(context.request.url);
  return Response.redirect(${url.origin}/bot/, 301);
};

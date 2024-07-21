export async function streamingFetch(url, options) {
  const response = await fetch(url, options);
  if (!response.body) {
    throw new Error('Response body is not readable.');
  }
  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  // Create a readable stream
  const stream = new ReadableStream({
    start(controller) {
      reader.read().then(function processText({ done, value }) {
        if (done) {
          controller.close();
          return;
        }
        controller.enqueue(decoder.decode(value, { stream: true }));
        reader.read().then(processText);
      }).catch((err) => {
        controller.error(err);
      });
    },
  });

  return new Response(stream);
}

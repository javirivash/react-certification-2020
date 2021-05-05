const validateItems = (items) => {
  const filteredItems = items.filter((item) => {
    return item.snippet && item.id?.videoId;
  });

  const restoreCharacters = (text) => {
    return text
      .replace(/&#34;|&quot;/g, '"')
      .replace(/&#39;|&apos;/g, "'")
      .replace(/&#38;|&amp;/g, "&");
  };

  const validatedItems = filteredItems.slice(0, 24).map((item) => {
    const {
      title,
      description,
      channelTitle,
      thumbnails: {
        medium: { url },
      },
    } = item.snippet;

    return {
      id: item.id.videoId,
      title: restoreCharacters(title),
      description: restoreCharacters(description),
      channelTitle: restoreCharacters(channelTitle),
      thumbnail: url,
      isFavorite: null,
    };
  });
  return validatedItems;
};

export default validateItems;

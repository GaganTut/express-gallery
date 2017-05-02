/*jshint esversion: 6*/

module.exports = (() => {
  const createObjectList = (data) => {
    return {photos: data.reduce((prev, curr) => {
      prev.push(curr.dataValues);
      return prev;
    },[])};
  };

  const prepareForRender = (data) => {
    return {
      id: data.id,
      title: data.title,
      imgUrl: data.imgUrl,
      description: data.description,
      author: data.author
    };
  };

  return {
    createObjectList,
    prepareForRender
  };
})();
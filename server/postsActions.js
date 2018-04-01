const fs = require('fs');
const postsPath = './server/data/posts.json';
const postsActions = {
    getPhotoPosts: function (skip = 0, top = 10, filterConfig) {
        let res = fs.readFileSync(postsPath);
        if (res)
            return JSON.parse(res)
                .filter((elem) => {
                    if (filterConfig) {
                        if (filterConfig.author && elem.author.search(filterConfig.author) === -1)
                            return false;
                        if (filterConfig.createdAt) {
                            if (typeof elem.createdAt === 'string') {
                                elem.createdAt = new Date(elem.createdAt);
                            }
                            let d1 = elem.createdAt;
                            let d2 = filterConfig.createdAt;
                            if (!(d1.getDate() === d2.getDate() && (d1.getFullYear() === d2.getFullYear() || d2.getFullYear() === 1900) && d1.getMonth() === d2.getMonth()))
                                return false;
                        }
                        if (filterConfig.hashTags) {
                            let h1 = elem.hashTags;
                            let h2 = filterConfig.hashTags;
                            let f = true;
                            h2.forEach((el1) => {
                                if (!h1.find((el2) => { return el2.search(el1) === 0; }))
                                    f = false;
                            });
                            return f;
                        }
                    }
                    return true;
                })
                .slice(skip, skip + top);
    },
    getPhotoPost: function (id) {
        let res = fs.readFileSync(postsPath);
        if (res) {
            let photoPosts = JSON.parse(res);
            return photoPosts.find((el) => {
                return el.id === id;
            })
        }
    },
    validatePhotoPost: function (photoPost) {
        return Boolean(photoPost && Object.keys(photoPost).length < 8 && typeof photoPost.id === "string" &&
            typeof photoPost.description === "string" && photoPost.description.length < 200 && photoPost.createdAt instanceof Date &&
            typeof photoPost.author === "string" && photoPost.author.length > 0 && typeof photoPost.photoLink === "string" && photoPost.photoLink.length > 0);
    },
    addPhotoPost: function (photoPost) {
        if (typeof photoPost.createdAt === 'string') {
            photoPost.createdAt = new Date(photoPost.createdAt);
        }
        if (this.validatePhotoPost(photoPost) && !this.getPhotoPost(photoPost.id)) {
            let photoPosts = [];
            let res = fs.readFileSync(postsPath);
            if (res)
                photoPosts = JSON.parse(res);
            photoPosts.push(photoPost);
            photoPosts.sort((a, b) => {
                if (typeof a.createdAt === 'string') {
                    a.createdAt = new Date(a.createdAt);
                }
                if (typeof b.createdAt === 'string') {
                    b.createdAt = new Date(b.createdAt);
                }
                return b.createdAt - a.createdAt;
            });
            fs.writeFileSync(postsPath, JSON.stringify(photoPosts));
            return true;
        }
        return false;
    },
    editPhotoPost: function (id, photoPost) {
        let res = fs.readFileSync(postsPath);
        let photoPosts = JSON.parse(res);
        let ind;
        let post = photoPosts.find((el, i) => {
            if (el.id === id) {
                ind = i;
                return true;
            }
            return false;
        });
        if (post) {
            var temp = {};
            for (var k in post) {
                if (Array.isArray(post[k]))
                    temp[k] = post[k].slice();
                else
                    temp[k] = post[k];
            }
            if (photoPost.description)
                temp.description = photoPost.description;
            if (photoPost.photoLink)
                temp.photoLink = photoPost.photoLink;
            if (photoPost.likes && photoPost.likes.length > 0)
                temp.likes = photoPost.likes.slice();
            if (photoPost.hashTags && photoPost.hashTags.length > 0)
                temp.hashTags = photoPost.hashTags.slice();
            if (typeof temp.createdAt === 'string') {
                temp.createdAt = new Date(temp.createdAt);
            }
            if (this.validatePhotoPost(temp)) {
                photoPosts.splice(ind, 1, temp);
                fs.writeFileSync(postsPath, JSON.stringify(photoPosts));
                return true;
            }
            else
                return false;
        }
        return false;
    },
    removePhotoPost: function (id) {
        let res = fs.readFileSync(postsPath);
        let photoPosts = JSON.parse(res);
        let ind = photoPosts.findIndex((el) => {
            return el.id === id
        });
        if (ind !== -1) {
            photoPosts.splice(ind, 1);
            fs.writeFileSync(postsPath, JSON.stringify(photoPosts));
            return true;
        }
        return false;
    },
    addLike: function (id, name) {
        let res = fs.readFileSync(postsPath);
        let photoPosts = JSON.parse(res);
        let post = photoPosts.find((el) => {
            return el.id === id;
        })
        if (!post.likes.find((el) => {
            return el === name;
        })) {
            post.likes.push(name);
            fs.writeFileSync(postsPath, JSON.stringify(photoPosts));
            return true;
        }
        else
            return false;
    },
    delLike: function (id, name) {
        let res = fs.readFileSync(postsPath);
        let photoPosts = JSON.parse(res);
        let post = photoPosts.find((el) => {
            return el.id === id;
        })
        let i = post.likes.findIndex((el) => {
            return el === name;
        });
        if (i !== -1) {
            post.likes.splice(i, 1);
            fs.writeFileSync(postsPath, JSON.stringify(photoPosts));
            return true;
        }
        else
            return false;
    }
};
module.exports = postsActions;
class PostModel {
    constructor(added_by,created_at, content, id = null) {
        this.id = id;
        this.added_by = added_by;
        this.created_at = created_at;
        this.content = content;
    }
}

module.exports = PostModel;




import { PostsService } from './posts.service';

describe('PostsService', () => {
  let postsService: PostsService;

  beforeEach(() => {
    postsService = new PostsService();
  });

  describe('.findMany', () => {
    const posts = [
      {text: 'Post 1'},
      {text: 'Post 2'},
      {text: 'Post 3'},
      {text: 'Post 4'},
    ];

    beforeEach(() => {
      posts.forEach((post) => postsService.create(post));
    });

    it('should return all posts if called without options', () => {
      const posts = postsService.findMany();

      expect(posts.length).toBe(4);
    });

    it('should return correct posts for skip and limit options', () => {
      const posts = postsService.findMany({ skip: 1, limit: 2});

      expect(posts.length).toEqual(2);
      expect(posts[0]).toEqual({
        text: 'Post 2',
        id: '2',
      });
      expect(posts[1]).toEqual({
        text: 'Post 3',
        id: '3',
      });
    });
  });

  describe('.delete', () => {
    it('should delete a post', () => {
      const post = postsService.create({ text: 'Post will be deleted' });
      postsService.delete(post.id);

      const postNotFound = postsService.find(post.id);
      expect(postNotFound).toEqual(undefined);
    });
  });

  describe('.update', () => {
    it('should update post', () => {
      const post = postsService.create({ text: 'Post will be updated' });
      postsService.update(post.id, { text: 'Updated post!' });

      const updatedPost = postsService.find(post.id);

      expect(updatedPost).toEqual({
        id: '1',
        text: 'Updated post!',
      });
    });

    it('should throw an error if post is not found', () => {
      const post = postsService.create({ text: 'Post will be updated' });
      
      expect(() => postsService.update('wrong id', { text: 'Updated post' })).toThrow(new Error('Пост не найден'));
    });
  });
});
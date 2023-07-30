class PostsController < ApplicationController
    def index
        @posts = Post.all
        render json: @posts
    end

    def create
        @post = Post.new(post_params)

        if @post.save
            render json: @post, status: :created
        else
            render json: @post.errors, status: :unprocessable_entity
        end
    end

    def destroy
        @post = Post.find(params[:id])
        @post.destroy
        render json: @post, status: :ok
    end
    
      private
    
    def post_params
        params.require(:post).permit(:name, :description)
    end
end

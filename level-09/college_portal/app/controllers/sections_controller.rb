class SectionsController < ApplicationController
  before_action :authenticate_user!

  def index
    if params[:department_id]
      @sections = Section.where(department_id: params[:department_id]).all
    else
      @sections = Section.all
    end
  end

  def new
    unless current_user.admin?
      flash[:danger] = "You are not allowed to access this page."
      redirect_to root_path
    end
    @section = Section.new
    @department_collection = Department.all.collect { |p| [p.name, p.id] }
  end

  def create
    unless current_user.admin?
      flash[:danger] = "You are not allowed to access this page."
      redirect_to root_path
    end
    @section = Section.new(section_params)
    @department_collection = Department.all.collect { |p| [p.name, p.id] }
    if @section.save
      redirect_to action: "index"
    else
      flash.now[:danger] = @section.errors.values.join(", ")
      render "new"
    end
  end

  #def show
  # @section=Section.find(params[:id])
  #@students=@section.students
  #end

  private

  def section_params
    params[:section].permit(:name, :department_id)
  end
end

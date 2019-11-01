class DepartmentsController < ApplicationController

  before_action :authenticate_user!

  def index
    @departments = Department.all
  end

  def show
    @departments = Department.all
  end

  def new
    unless current_user.admin?
      flash[:danger] = "You are not allowed to access this page."
      redirect_to root_path
    end

    @department = Department.new
  end

  def create

    unless current_user.admin?
      flash[:danger] = "You are not allowed to access this page."
      redirect_to root_path
    end

    @department = Department.new(department_params)
    # @department.name.upcase! #This line is not needed here since it is now included in callback
    if @department.save
      redirect_to action: "index"
    else
      render "new"
    end
  end

  def show
  end

  private

  def department_params
    params[:department].permit(:name)
  end
end

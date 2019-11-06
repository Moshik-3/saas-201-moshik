class AddRollNoToStudents < ActiveRecord::Migration[5.2]
  def change
    add_column :students, :roll_no, :string
  end
end

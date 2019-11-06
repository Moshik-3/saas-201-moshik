class RemoveRollNoFromStudents < ActiveRecord::Migration[5.2]
  def change
    remove_column :students, :roll_no, :integer
  end
end

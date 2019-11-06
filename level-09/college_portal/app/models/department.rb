class Department < ApplicationRecord
  has_many :sections, dependent: :destroy
  has_many :students, dependent: :destroy

  # validations
  validates :name, presence: true, uniqueness: { case_sensitive: false }
  #callbacks
  before_create :upcase_department

  private

  def upcase_department
    self.name.upcase!
  end
end

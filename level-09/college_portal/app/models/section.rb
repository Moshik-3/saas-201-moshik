class Section < ApplicationRecord
  belongs_to :department
  has_many :students, dependent: :destroy

  #validations
  validates :name, presence: true
  validates :department_id, presence: true

  #callbacks
  before_create :upcase_section

  private

  def upcase_section
    self.name.upcase!
  end
end

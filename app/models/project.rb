class Project < ActiveRecord::Base
  attr_accessible :description, :title, :url, :urlgithub, :tags_attributes
  validates :title,  :presence => true
  validates :description, :presence => true
  has_many :tags
 
  accepts_nested_attributes_for :tags, :allow_destroy => :true,
    :reject_if => proc { |attrs| attrs.all? { |k, v| v.blank? } }
end

class Project < ActiveRecord::Base
  attr_accessible :description, :title, :url, :urlgithub
  validates :title,  :presence => true
  validates :description, :presence => true
end

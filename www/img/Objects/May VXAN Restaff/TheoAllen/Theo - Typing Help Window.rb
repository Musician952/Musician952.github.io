# =============================================================================
# TheoAllen - Typing Help Window
# Version : 1.0
# Contact : www.rpgmakerid.com (or) http://theolized.blogspot.com
# (English Documentation)
# =============================================================================
($imported ||= {})[:Theo_TypingHelp] = true
# =============================================================================
# Change Logs :
# -----------------------------------------------------------------------------
# 2014.03.30 - Finished script
# =============================================================================
=begin

  Introduction :
  This script give you typing effect on help window just like message window
  
  How to use :
  Put this script below material but above main. It's plug and play
  
  Terms of use :
  Credit me, TheoAllen. You are free to edit this script by your own. As long 
  as you don't claim it yours. For commercial purpose, don't forget to give me 
  a free copy of the game.

=end
# =============================================================================
# No config ~
# =============================================================================
class Window_Help
  
  def refresh
    contents.clear
    @fiber = Fiber.new { update_typing }
  end
  
  alias theo_typinghelp_update update
  def update
    theo_typinghelp_update
    @fiber.resume if @fiber
  end
  
  alias theo_typinghelp_process_char process_character
  def process_character(*args)
    theo_typinghelp_process_char(*args)
    Fiber.yield
  end
  
  def update_typing
    draw_text_ex(4, 0, @text)
    @fiber = nil
  end
  
end

if $imported["YEA-BattleEngine"]
class Window_BattleHelp
  
  alias theo_yea_ref_battlername refresh_battler_name
  def refresh_battler_name(battler)
    @fiber = nil
    theo_yea_ref_battlername(battler)
  end
  
  alias theo_yea_ref_special_case refresh_special_case
  def refresh_special_case(battler)
    @fiber = nil
    theo_yea_ref_special_case(battler)
  end
  
end
end